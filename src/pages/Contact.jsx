import axios from "axios";
import useForm from "../hooks/useForm";

function Contact() {
  const {
    values,
    errors,
    isSubmitting,
    setIsSubmitting,
    success,
    setSuccess,
    handleChange,
    validate,
  } = useForm({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSuccess(false);

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const safeValues = {
        fullName: values.fullName,
        email: values.email,
        phone: values.phone,
        message: values.message,
      };
      await axios.post("https://jsonplaceholder.typicode.com/posts", safeValues);

      setSuccess(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container py-5">
      <div className="text-center mb-4">
        <span className="section-tag">CONTACT US</span>

        <h1>Get In Touch</h1>

        <p>
          Send us your message and we will get back to you.
        </p>
      </div>

     <form
  onSubmit={handleSubmit}
  className="mx-auto"
  style={{ maxWidth: "700px" }}
  noValidate
>
        <div className="mb-3">
          <label className="form-label">
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            className="form-control"
            value={values.fullName}
            onChange={handleChange}
          />

          {errors.fullName && (
            <small className="text-danger">
              {errors.fullName}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            className="form-control"
            value={values.email}
            onChange={handleChange}
          />

          {errors.email && (
            <small className="text-danger">
              {errors.email}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Password
          </label>

          <input
            type="password"
            name="password"
            className="form-control"
            value={values.password}
            onChange={handleChange}
          />

          {errors.password && (
            <small className="text-danger">
              {errors.password}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Phone Number
          </label>

          <input
            type="tel"
            name="phone"
            className="form-control"
            value={values.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <small className="text-danger">
              {errors.phone}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Message
          </label>

          <textarea
            name="message"
            rows="5"
            className="form-control"
            value={values.message}
            onChange={handleChange}
          />

          {errors.message && (
            <small className="text-danger">
              {errors.message}
            </small>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-dark w-100"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Submitting..."
            : "Submit"}
        </button>

        {success && (
          <div className="alert alert-success mt-3">
            ✅ Your form has been submitted successfully!
          </div>
        )}
      </form>
    </section>
  );
}

export default Contact;