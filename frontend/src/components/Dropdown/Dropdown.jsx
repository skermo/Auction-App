import { EventSourcePolyfill } from "ng-event-source";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BASE_URL } from "../../config";
import useAuth from "../../hooks/useAuth";
import { itemService } from "../../services/itemService";
import { notificationService } from "../../services/notificationService";
import { utils } from "../../utils/utils";
import DropdownRow from "../DropdownRow/DropdownRow";
import "./dropdown.scss";

const Dropdown = ({ label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pageNotifications, setPageNotifications] = useState(0);
  const [lastPageNotifications, setLastPageNotifications] = useState(false);

  const { auth } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      setPageNotifications(0);
      fetchNotifications();
    }
  }, [auth]);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      let eventSource = new EventSourcePolyfill(
        `${BASE_URL}/notifications/add-connection/${auth?.user?.id}`,
        {
          headers: { Authorization: `Bearer ${auth?.accessToken}` },
          heartbeatTimeout: 60000 * 15,
        }
      );
      eventSource.onerror = () => {
        eventSource.close();
      };
      eventSource.addEventListener(auth?.user?.id, handleNewNotification);
      return () => eventSource.close();
    }
  }, [auth]);

  const showToast = (notification) => {
    itemService.getItemById(notification.itemId).then((res) => {
      if (notification.type === "OUTBID") {
        toast.warn(
          <div>
            You have been outbid on: <br /> {utils.shortenName(res.name)}
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClick: () => {
              navigate(`/items/${notification.itemId}`);
            },
          }
        );
      } else {
        toast.info(
          <div>
            You have won the auction on: <br /> {utils.shortenName(res.name)}
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            onClick: () => {
              navigate(`/items/${notification.itemId}`);
            },
          }
        );
      }
    });
  };

  const handleNewNotification = (e) => {
    const data = JSON.parse(e.data);
    showToast(data);
    setNotifications((current) => [
      {
        id: data.i,
        itemId: data.itemId,
        userId: data.userId,
        type: data.type,
        dateTime: data.dateTime,
      },
      ...current,
    ]);
  };

  const fetchNotifications = () => {
    notificationService
      .getUnreadNotifications(
        auth?.user?.id,
        auth?.accessToken,
        pageNotifications
      )
      .then((res) => {
        setNotifications([...notifications, ...res.content]);
        setLastPageNotifications(res.last);
        setPageNotifications(pageNotifications + 1);
      });
  };

  const handleClick = (notification) => {
    setIsOpen(false);
    if (notification.type === "OUTBID") {
      navigate(`/items/${notification.itemId}`);
    } else {
      navigate(`/items/${notification.itemId}`, { state: true });
    }
    notificationService.deleteReadNotification(
      auth?.user.id,
      auth?.accessToken,
      notification.id
    );
    setNotifications((current) =>
      current.filter((value) => value.id !== notification.id)
    );
    if (notifications.length < 5) {
      fetchNotifications();
    }
  };

  return (
    <div className="dropdown">
      <ToastContainer />
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {label}
        {notifications.length > 0 && <div className="circle" />}
      </div>
      {isOpen && (
        <div id="scrollableDiv" style={{ overflow: "auto" }}>
          {notifications.length < 4 ? (
            notifications.length > 0 ? (
              <div className="dropdown-body">
                {notifications.map((value, key) => {
                  return (
                    <DropdownRow
                      key={value.id}
                      notification={value}
                      onClick={() => {
                        handleClick(value);
                      }}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="dropdown-body">
                <div className="no-notifications">No new notifications.</div>
              </div>
            )
          ) : (
            <InfiniteScroll
              dataLength={notifications.length}
              next={fetchNotifications}
              hasMore={!lastPageNotifications}
              scrollableTarget="scrollableDiv"
              className="dropdown-body"
              height={300}
            >
              {notifications.map((value, key) => {
                return (
                  <DropdownRow
                    key={value.id}
                    notification={value}
                    onClick={() => {
                      handleClick(value);
                    }}
                  />
                );
              })}
            </InfiniteScroll>
          )}
        </div>
      )}
    </div>
  );
};
export default Dropdown;
