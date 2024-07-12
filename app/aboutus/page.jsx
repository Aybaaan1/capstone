import Button from "../_components/Button";

const AboutUs = () => {
  return (
    <div className="w-full">
      <section className="w-full h-screen mx-auto">
        <div
          className="w-full h-1/2 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/imgs/aboutus_hero.png')" }}
        ></div>
        <div>
          <h2>About Us</h2>
          <p>
            The SSG Connect is a comprehensive digital platform meticulously
            designed to streamline student services and enhance engagement
            within CTU Argao (CTU-AC)
          </p>
          <h4>What is SSGConnect?</h4>
          <p>
            The SSG Connect is a comprehensive digital platform meticulously
            designed to streamline student services and enhance engagement
            within CTU Argao (CTU-AC)
          </p>

          <Button bgColor="black" txtColor="white" paddingX="3" paddingY="2">
            Chat us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
