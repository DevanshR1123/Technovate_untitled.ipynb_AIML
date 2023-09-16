export default async ({ params }: { params: { id: number } }) => {
  return (
    <div className="self-center">
      <h1 className="text-white">Trip {params.id}</h1>
    </div>
  );
};
