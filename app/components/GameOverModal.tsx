import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { useRouter } from "next/navigation";
import { MAX_SCORE } from "../constants";

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  score: number;
  name: string;
  onPlayAgain: () => void;
};

const GameOverModal = ({
  isOpen,
  onOpenChange,
  score,
  name,
  onPlayAgain,
}: Props) => {
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await (
        await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, score }),
        })
      ).json();

      if ("error" in res) {
        onOpenChange(false);
        onPlayAgain();

        return;
      }

      onOpenChange(false);
      router.push("/scores");
    } catch (error) {
      console.error(error);
      onOpenChange(false);
      onPlayAgain();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      isDismissable={false}
      isKeyboardDismissDisabled
      hideCloseButton
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {score === MAX_SCORE ? "You Beat the Game!" : "Game Over"}
            </ModalHeader>
            <ModalBody>
              <p>
                Your score is: <span className="font-medium">{score}</span>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="secondary"
                onPress={() => {
                  onClose();
                  onPlayAgain();
                }}
              >
                Play Again
              </Button>
              <Button color="success" onPress={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default GameOverModal;
