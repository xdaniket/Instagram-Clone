import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FilterList } from "./Filter-List";
import { v4 } from "uuid";
import "../insta.css";
import axios from "axios";

const CreatePost = () => {
  const [userSelectImages, setUserSelectImages] = useState();
  const [uploadImages, setUploadImages] = useState([]);
  const [showImg, setShowImg] = useState([]);
  const [filePreview, setFilePreview] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filterClass, setFilterClass] = useState("");
  const [gridVisible, setGridVisible] = useState(false);
  const [captionInputVisible, setCaptionInputVisible] = useState(false);

  useEffect(() => {
    const url = "http://localhost:4000/post/list?userId=1234";
    axios.get(url).then((response) => {
      response.data.data.results[0].response.map((item) => {
        return item.attachments.map((itemNxt) => {
          return setShowImg((prevState) => [
            ...prevState,
            itemNxt.url,
            { description: item.description },
          ]);
        });
      });
    });
  }, []);

  const handleSelectImagesByUser = (e) => {
    setUserSelectImages(URL.createObjectURL(e.target.files[0]));
    setFilePreview(e.target.files[0]);
  };

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);

  const changeFilterOnSelectedImages = () => {
    setGridVisible(!gridVisible);
  };
  const handleCaption = () => {
    setCaptionInputVisible(!captionInputVisible);
    setGridVisible(false);
  };

  const handleUploadImages = () => {
    setUploadImages((item) => [
      {
        id: v4(),
        caption: captionInputVisible,
        image: userSelectImages,
        class: filterClass,
      },
      ...item,
    ]);

    let formData = new FormData();
    formData.append("file", filePreview);

    axios
      .post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        axios.post("http://localhost:4000/post", {
          userId: "1234",
          description: captionInputVisible,
          attachments: res.data,
        });
      });

    setModalOpen(false);
    setUserSelectImages(null);
    setCaptionInputVisible(false);
    setFilterClass("");
  };

  return (
    <div>
      <Button variant="contained" onClick={handleModalOpen}>
        Create Post
      </Button>

      <Modal
        style={{ background: "rgb(239 234 234 / 50%)" }}
        open={modalOpen}
        onClose={handleModalClose}>
        <Box className="boxStyle">
          {userSelectImages ? (
            <>
              <span>
                <Button
                  className="filterBtn"
                  onClick={changeFilterOnSelectedImages}>
                  Filter
                </Button>
              </span>
              <img
                className={filterClass}
                src={userSelectImages}
                style={{ height: "400px", width: "400px" }}
                alt="Selected-Image"
              />

              <div
                className={`filter-grid ${gridVisible ? "visible" : "hidden"}`}>
                <div className="nxtBtn">
                  <Button onClick={handleCaption}>NEXT</Button>
                </div>
                {FilterList.map((item, index) => (
                  <div key={index} style={{ padding: 7 }}>
                    <img
                      style={{ width: 125, cursor: "pointer" }}
                      className={item.class}
                      onClick={() => setFilterClass(item.class)}
                      src={userSelectImages}
                      alt=""
                    />

                    <div
                      className="filter-item"
                      key={index}
                      onClick={() => setFilterClass(item.class)}>
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ position: "fixed", right: 336 }}>
                {captionInputVisible && (
                  <Button className="shareBtn" onClick={handleUploadImages}>
                    SHARE
                  </Button>
                )}
                {captionInputVisible && (
                  <textarea
                    className="textArea"
                    onChange={(e) => setCaptionInputVisible(e.target.value)}
                    placeholder="Add Your Caption"></textarea>
                )}
              </div>
            </>
          ) : (
            <>
              <h2>Create New Post</h2>
              <div style={{ marginBottom: 12 }}>
                <Button variant="contained" component="label">
                  Upload Images
                  <input
                    hidden
                    onChange={handleSelectImagesByUser}
                    type="file"
                  />
                </Button>
              </div>
            </>
          )}
        </Box>
      </Modal>
      {uploadImages.map((item) => {
        return (
          <>
            <div className="showImgDiv" id={item.id}>
              <img
                src={item.image}
                className={item.class}
                alt=""
                width={"400px"}
              />
              <h3>{item.caption}</h3>
            </div>
          </>
        );
      })}

      {showImg.map((items, index) => {
        return (
          <div className="showImgDiv" key={index}>
            <img src={`http://${items}`} alt="" width={"400px"} />
            <h3>{items.description}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default CreatePost;
