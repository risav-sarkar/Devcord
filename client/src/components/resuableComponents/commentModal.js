import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const CommentModal = ({ data, func }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    FetchComments();
  }, []);

  const FetchComments = async () => {
    const res = await axios.get(
      `http://localhost:8800/api/posts/comment/${data._id}`
    );
    setComments(res.data);
  };

  const textRef = useRef();
  const formRef = useRef();
  const HandleSubmit = (e) => {
    e.preventDefault();
    setComments([...comments, textRef.current.value]);
    formRef.current.reset();
  };

  console.log(comments);
  console.log(textRef);

  return (
    <div className="modalContainerComment">
      <div className="modalContentComment">
        <div className="box">
          <div className="box1">
            <div>
              {data.img.length > 0 ? (
                <div className="imageContainer">
                  <img src={data.img[0]} />
                </div>
              ) : null}
              {data.desc ? (
                <div className="mainText">
                  <p>{data.desc}</p>
                </div>
              ) : null}
            </div>
          </div>

          <div className="box2">
            <div className="header">
              <h1>Comments</h1>
              <button
                onClick={() => {
                  func();
                }}
              >
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </div>

            <div className="commentBox">
              {comments.length === 0 ? (
                <h4>No Comments!</h4>
              ) : (
                comments.map((i) => {
                  return <h3>{i.text}</h3>;
                })
              )}
            </div>

            <div className="btnContainer">
              <form
                className="commentForm"
                onSubmit={HandleSubmit}
                ref={formRef}
              >
                <input
                  type="text"
                  placeholder="Add a comment!"
                  ref={textRef}
                  required
                />

                <button type="submit">
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
