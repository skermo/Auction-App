import Button from "../components/button/Button";
import arrowRight from "../resources/images/arrowRight.svg";


export default {
    title: "Button",
    component: Button,
}

const Template = args => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
    type: "primary",
    text: "LOGIN",
    icon: arrowRight,
}

export const Secondary = Template.bind({})
Secondary.args = {
    type: "secondary",
    text: "LOGIN",
    icon: arrowRight,
}

export const Tertiary = Template.bind({})
Tertiary.args = {
    type: "tertiary",
    text: "LOGIN",
    icon: arrowRight,
}