import CardGame from "@/components/CardGame";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 lg:w-3/4 my-24">
      <div>
        <h1 className="text-3xl font-bold text-center text-gradient">
          Whoops! This page doesn&apos;t seem to exist
        </h1>

        <p className="text-center mt-12 mb-2 text-lg">
          Here&apos;s a game of cards!
        </p>
        <CardGame />
      </div>
    </div>
  );
};

export default NotFound;
