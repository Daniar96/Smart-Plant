import { React, useState, useEffect } from "react";
import "./support.scss";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { useUserContext } from "../../components/context/UserContext";
import RemoveIcon from "@mui/icons-material/Remove";
import { useDropzone } from "react-dropzone";
import { HiOutlineUpload } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import Faq from "./Faq";

export default function Support() {
  const { user, setUserData } = useUserContext();
  const [expanded, setExpanded] = useState(new Array(Faq.length).fill(false));

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        handleFileDrop(acceptedFiles[0]);
      }
    },
  });

  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileDrop = (file) => {
    setUploadedFile(file);
  };

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    const newExpanded = [...expanded];
    newExpanded[panel] = isExpanded;
    setExpanded(newExpanded);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = document.getElementById("form-support");
    const formData = new FormData(form);
    formData.delete("name");
    if (uploadedFile) {
      formData.append("file", uploadedFile);
    }
    try {
      const response = await fetch("http://3.124.188.58/api/mail", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      toast.success("Email sent successfully!", { duration: 5000 });
    } catch (error) {}
  };

  return (
    <div className="support">
      <Toaster position="top-right" reverseOrder={false} />
      <form
        id="form-support"
        action=""
        onSubmit={handleSubmit}
        method=""
        encType="multipart/form-data"
      >
        <div className="form-containter">
          <h2>Please fill in the form and describe your issue:</h2>
          <div className="input-field">
            <div className="data">
              <input type="text" name="name" value={user.fullName} readOnly />
            </div>
            <input type="hidden" name="to" value="rrifat.hassan88@gmail.com" />
            <div className="data">
              <input type="email" name="cc" value={user.email} readOnly />
            </div>
          </div>
          <div className="fake">
            <div className="subject">
              <input type="text" name="subject" placeholder="Subject" />
            </div>
            <div className="subject"></div>
          </div>
          <div className="support-text">
            <textarea
              rows="9"
              name="body"
              id="text"
              placeholder="Your question or comment: (Up to 1000 char.)"
              required
            />
          </div>
          <div className="image">
            <h3>
              A screenshot will help us better understand your problem
              (optional)
            </h3>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              {acceptedFiles.length > 0 ? (
                <p>
                  {acceptedFiles[0].name} <IoMdClose className="remove-image" />
                </p>
              ) : (
                <p>
                  <HiOutlineUpload className="upload-icon" /> Upload screenshot
                </p>
              )}
            </div>
          </div>
          <button type="submit" className="send-btn">
            Send
          </button>
        </div>
      </form>
      <h1>FAQ</h1>
      <h4>Frequently asked questions</h4>
      <div>
        {Faq.map(({ id, question, answer }, index) => (
          <Accordion
            expanded={expanded[index]}
            onChange={handleChange(index)}
            key={id}
            className="accordion"
          >
            <AccordionSummary
              expandIcon={expanded[index] ? <RemoveIcon /> : <AddIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography component="div" className="head-text">
                {question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography component="div" className="content-text">
                {answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
