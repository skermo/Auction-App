import React from "react";
import AboutUs1 from "../../resources/images/aboutUs1.jpg";
import AboutUs2 from "../../resources/images/aboutUs2.jpg";
import AboutUs3 from "../../resources/images/aboutUs3.jpg";
import "./about-us.scss";

const AboutUs = () => {
  return (
    <div>
      <div className="about-us">
        <div className="about-us__text about-us__content">
          <div className="about-us__title">About Us</div>
          <div className="about-us__paragraph">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Massa
            vitae tortor condimentum lacinia quis. Neque laoreet suspendisse
            interdum consectetur libero id faucibus. Tincidunt nunc pulvinar
            sapien et. Metus aliquam eleifend mi in nulla. Mauris in aliquam sem
            fringilla ut. Amet luctus venenatis lectus magna. Iaculis urna id
            volutpat lacus laoreet non curabitur gravida arcu. Orci eu lobortis
            elementum nibh. Amet consectetur adipiscing elit ut.
          </div>
          <div className="about-us__paragraph">
            Euismod in pellentesque massa placerat duis ultricies lacus.
            Tincidunt tortor aliquam nulla facilisi cras fermentum. Fusce ut
            placerat orci nulla pellentesque dignissim enim. Facilisis sed odio
            morbi quis commodo odio. Quis viverra nibh cras pulvinar mattis
            nunc. Nunc eget lorem dolor sed viverra ipsum nunc aliquet bibendum.
            Morbi non arcu risus quis varius quam quisque id diam. Orci porta
            non pulvinar neque laoreet suspendisse. Non enim praesent elementum
            facilisis leo vel.
          </div>
          <div className="about-us__paragraph">
            Volutpat maecenas volutpat blandit aliquam etiam erat velit
            scelerisque in. Cum sociis natoque penatibus et magnis dis. In arcu
            cursus euismod quis viverra nibh cras pulvinar. Rhoncus dolor purus
            non enim. Nulla pellentesque dignissim enim sit amet venenatis urna.
            Pellentesque habitant morbi tristique senectus. Placerat vestibulum
            lectus mauris ultrices eros in cursus turpis massa. Scelerisque
            purus semper eget duis at tellus at urna. Viverra nam libero justo
            laoreet sit amet.
          </div>
          <div className="about-us__paragraph">
            Gravida in fermentum et sollicitudin ac. Faucibus nisl tincidunt
            eget nullam non nisi est. Pulvinar elementum integer enim neque
            volutpat ac tincidunt vitae semper. Cursus metus aliquam eleifend mi
            in nulla posuere sollicitudin. Nibh tortor id aliquet lectus proin
            nibh nisl condimentum. Morbi enim nunc faucibus a pellentesque sit
            amet. Sed lectus vestibulum mattis ullamcorper velit sed
            ullamcorper. Venenatis tellus in metus vulputate eu scelerisque
            felis imperdiet.
          </div>
        </div>
        <div className="about-us__content images">
          <img src={AboutUs1} className="top-image" alt="us" />
          <div className="bottom-images">
            <img src={AboutUs2} alt="us" />
            <img src={AboutUs3} alt="us" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
