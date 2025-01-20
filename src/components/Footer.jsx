function Footer() {
  return (
    <footer className="bg-[#FF5733]">
      <div className="container text-center text-lg text-white py-6 fon">
        This project uses the{" "}
        <a
          href="https://opencritic.com"
          target="_blank"
          className="text-black underline"
        >
          OpenCritic API
        </a>{" "}
        to display video game reviews and details. Built with React and
        TailwindCSS.
      </div>
    </footer>
  );
}

export default Footer;
