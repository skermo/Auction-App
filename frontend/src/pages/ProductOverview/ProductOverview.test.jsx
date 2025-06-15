import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import ProductOverview from "./ProductOverview";
import { BrowserRouter } from "react-router-dom";
import * as itemService from "../../services/itemService";
import * as bidService from "../../services/bidService";
import * as utils from "../../utils/utils";
import * as useAuthHook from "../../hooks/useAuth";
import * as eventSourceService from "../../services/eventSourceService";

jest.mock("../../hooks/useToast", () => () => ({
  infoToast: jest.fn(),
}));
jest.mock("../../config", () => ({
  BASE_URL: "http://mocked-url.com/api",
}));
jest.mock("../../services/bidService", () => ({
  addNewBid: jest.fn(),
  bidService: {
    isHighestBidder: jest.fn(() => Promise.resolve(false)),
  },
}));
jest.mock("ng-event-source", () => ({
  EventSourcePolyfill: jest.fn(() => ({
    addEventListener: jest.fn(),
    close: jest.fn(),
    onerror: jest.fn(),
  })),
}));
jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));
jest.mock("../../services/bidService");
jest.mock("../../services/eventSourceService");
jest.mock("../../components/Gallery/Gallery", () => () => <div>Gallery</div>);
jest.mock("../../components/Breadcrumbs/Breadcrumbs", () => () => (
  <div>Breadcrumbs</div>
));
jest.mock("../../components/Tabs/Tabs", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../../components/PopUp/PopUp", () => ({ children }) => (
  <div>{children}</div>
));
jest.mock("../../components/Payment/Payment", () => () => <div>Payment</div>);

const itemMock = {
  id: "1",
  name: "Vintage Clock",
  startPrice: 100,
  highestBid: 120,
  endDate: "2099-01-01",
  sellerId: "otherUser",
  buyerId: null,
  noBids: 3,
  description: "Old but gold",
};

describe("ProductOverview Integration Tests", () => {
  beforeEach(() => {
    jest
      .spyOn(itemService.itemService, "getItemById")
      .mockResolvedValue(itemMock);
    jest
      .spyOn(bidService.bidService, "isHighestBidder")
      .mockResolvedValue(true);
    jest.spyOn(utils.utils, "parseNum").mockImplementation((n) => Number(n));
    jest.spyOn(utils.utils, "addFloats").mockImplementation((a, b) => a + b);
    jest.spyOn(utils.utils, "convertDate").mockReturnValue("2 days left");
    jest.spyOn(utils.utils, "hasDatePassed").mockReturnValue(false);
    jest.spyOn(useAuthHook, "default").mockReturnValue({
      auth: { user: { id: "user123" }, accessToken: "token" },
    });
    eventSourceService.eventSourceService.newItemUpdateEventSourcePolyfill.mockReturnValue(
      {
        addEventListener: jest.fn(),
        close: jest.fn(),
      }
    );
  });

  test("renders item info correctly", async () => {
    render(
      <BrowserRouter>
        <ProductOverview />
      </BrowserRouter>
    );
    await waitFor(() =>
      expect(screen.getByText("Vintage Clock")).toBeInTheDocument()
    );
    expect(screen.getByText("Starts from")).toBeInTheDocument();
    expect(screen.getByText("Highest bid:")).toBeInTheDocument();
    expect(screen.getByText("Number of bids:")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter $121 or higher")
    ).toBeInTheDocument();
  });

  test("shows validation error on negative bid", async () => {
    render(
      <BrowserRouter>
        <ProductOverview />
      </BrowserRouter>
    );

    const bidInput = await screen.findByPlaceholderText(/Enter \$121/i);

    fireEvent.change(bidInput, { target: { value: "-10" } });

    fireEvent.click(screen.getByText("PLACE BID"));

    await waitFor(() =>
      expect(
        screen.getByText("Bid must be a positive number")
      ).toBeInTheDocument()
    );
  });

  test("opens confirmation popup with valid bid", async () => {
    render(
      <BrowserRouter>
        <ProductOverview />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByPlaceholderText(/Enter \$121/));
    const input = screen.getByPlaceholderText(/Enter \$121/);
    fireEvent.change(input, { target: { value: "150" } });
    fireEvent.click(screen.getByText("PLACE BID"));
    await waitFor(() =>
      expect(screen.getByText("Are you sure?")).toBeInTheDocument()
    );
    expect(
      screen.getByText("You're about to place a bid of:")
    ).toBeInTheDocument();
  });

  test("clicking CONTINUE in popup submits bid and shows success message", async () => {
    bidService.addNewBid.mockResolvedValueOnce();
    render(
      <BrowserRouter>
        <ProductOverview />
      </BrowserRouter>
    );
    await waitFor(() => screen.getByPlaceholderText(/Enter \$121/));
    fireEvent.change(screen.getByPlaceholderText(/Enter \$121/), {
      target: { value: "150" },
    });
    fireEvent.click(screen.getByText("PLACE BID"));
    await waitFor(() => screen.getByText("CONTINUE"));
    fireEvent.click(screen.getByText("CONTINUE"));
    await waitFor(() =>
      expect(
        screen.getByText("You are the highest bidder!")
      ).toBeInTheDocument()
    );
  });

  test("displays PAY button when user is highest bidder and auction ended", async () => {
    jest.spyOn(utils.utils, "hasDatePassed").mockReturnValue(true);
    render(
      <BrowserRouter>
        <ProductOverview />
      </BrowserRouter>
    );
    await waitFor(() => expect(screen.getByText("PAY")).toBeInTheDocument());
  });
});
