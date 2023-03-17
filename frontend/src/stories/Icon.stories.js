import Icon from "../components/Icon/Icon";
import { FbIcon } from "../resources/icons";
export default {
  title: "Icon",
  component: Icon,
};

export const Facebook = () => (
  <Icon Icon={FbIcon} url="https://www.facebook.com/" />
);
