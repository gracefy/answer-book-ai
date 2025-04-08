// This component is used to display a fortune card with the provided text.

type Props = {
  text: string;
};

const AnswerCard = ({ text }: Props) => {
  if (!text) return null;

  return (
    <div className="text-xl font-semibold text-center bg-white p-6 rounded-xl border shadow-lg max-w-md">
      <p className="text-gray-700 italic text-center">
        “{text}”
      </p>
    </div>
  );
};

export default AnswerCard;
