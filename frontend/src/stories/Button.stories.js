import Button from "../components/Button/Button";
import { ArrowRight } from "../resources/icons";

export default {
  title: "Button",
  component: Button,
};

export const Primary = () => (
  <Button type="primary" text="LOGIN" Icon={ArrowRight} />
);

export const Secondary = () => (
  <Button type="secondary" text="LOGIN" Icon={ArrowRight} />
);

export const Tertiary = () => (
  <Button type="tertiary" text="LOGIN" Icon={ArrowRight} />
);
