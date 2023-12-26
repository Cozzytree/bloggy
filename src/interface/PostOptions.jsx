import { HiOutlineDotsHorizontal } from "react-icons/hi";
import Button from "./Button";
import Modal from "./Modal";
import { useState } from "react";
import AreYouSureWindow from "./AreYouSureWindow";

function PostOptions({ deleting, deletePost }) {
  const [isOptions, setIsOptions] = useState(false);
  return (
    <div className="relative">
      <Button onClick={() => setIsOptions((current) => !current)}>
        <HiOutlineDotsHorizontal className="z-0" />
      </Button>
      {isOptions && (
        <div className="absolute right-4 top-1">
          <Modal>
            <Modal.Open opens="openModal">
              <Button className="slowAndSteady">Delete</Button>
            </Modal.Open>
            <Modal.ModalWindow name="openModal">
              <AreYouSureWindow label="Are you sure you want to delete the post?">
                <Button
                  type="danger"
                  disabled={deleting}
                  onClick={() => {
                    console.log("clicked");
                    deletePost();
                  }}
                >
                  delete
                </Button>
              </AreYouSureWindow>
            </Modal.ModalWindow>
          </Modal>
        </div>
      )}
    </div>
  );
}

export default PostOptions;
