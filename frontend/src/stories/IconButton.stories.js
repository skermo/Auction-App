import IconButton from "../components/iconButton/IconButton";
import fbIcon from "../resources/images/fbIcon.svg"
export default{
    title: "Icon Button",
    component: IconButton,
}

const Template = args => <IconButton {...args} />

export const Facebook = Template.bind({})
Facebook.args = {
    imageUrl: fbIcon,
    websiteUrl: "https://www.facebook.com/",
}