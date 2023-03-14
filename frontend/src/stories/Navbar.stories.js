import Navbar from "../components/navbar/Navbar";

export default {
    title: "Navbar",
    component: Navbar,
}

const Template = args => <Navbar {...args} />

export const Primary = Template.bind({})
Primary.args = {
    username: "John Doe",
}