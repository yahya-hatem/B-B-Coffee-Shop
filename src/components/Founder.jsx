function Founder() {
  const founderNameStyle = {
    color: "#5b3826",
    fontSize: "36px",
    marginBottom: "5px",
  };

  const founderRoleStyle = {
    color: "#9a5a31",
    fontWeight: "bold",
    marginBottom: "18px",
  };

  return (
    <section className="founder-section" id="about">
      <div className="founder-avatar">
        👨‍💻
      </div>

      <div className="founder-content">
        <span className="section-tag">
          MEET THE FOUNDER
        </span>

        <h2 style={founderNameStyle}>
          YAHYA HATEM
        </h2>

        <h3 style={founderRoleStyle}>
          Founder & React Developer
        </h3>

        <p>
          B&B was created as a modern coffee shop
          experience that combines great coffee
          with clean and simple technology.
        </p>

        <p>
          I am passionate about building modern web
          experiences and learning new technologies
          through real-world projects.
        </p>

        <div className="skills">
          <span>ReactJS</span>
          <span>JavaScript</span>
          <span>HTML</span>
          <span>CSS</span>
        </div>
      </div>
    </section>
  );
}

export default Founder;