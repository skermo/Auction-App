import { withRouter } from "storybook-addon-react-router-v6";
import Footer from "../components/Footer/Footer";

export default {
  title: "Footer",
  component: Footer,
  decorators: [withRouter],
};

export const Example = () => <Footer />;
Example.story = {
  parameters: {
    reactRouter: {
      routePath: "/about-us",
    },
  },
};
