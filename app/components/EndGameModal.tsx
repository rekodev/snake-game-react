import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/modal';
import { useRouter } from 'next/navigation';
import { MAX_SCORE } from '../constants';

type Props = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  score: number;
  name: string;
};

const EndGameModal = ({ isOpen, onOpenChange, score, name }: Props) => {
  const router = useRouter();

  // TODO: Hook up the submit logic
  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, score }),
      });

      if (res.ok) {
        onOpenChange(false);
        router.push('/scores');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {score === MAX_SCORE ? 'You Beat the Game!' : 'Game Over'}
            </ModalHeader>
            <ModalBody>
              <p>
                Your score is: <span className=' font-medium'>{score}</span>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color='secondary' onPress={onClose}>
                Play Again
              </Button>
              <Button color='success' onPress={onClose}>
                Submit
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EndGameModal;
