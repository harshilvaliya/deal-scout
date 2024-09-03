import Image from "next/image";

interface Props {
  title: string;
  iconSrc: string;
  value: string;
}

const PriceInfoCard = ({ title, iconSrc, value }: Props) => {
  return (
    <div className="price-info_card p-4 bg-white rounded-lg shadow-md flex flex-col items-center gap-2">
      <p className="text-lg font-medium text-gray-700">{title}</p>
      <div className="flex items-center gap-2">
        <Image src={iconSrc} alt={title} width={24} height={24} />
        <p className="text-2xl font-bold text-secondary">{value}</p>
      </div>
    </div>
  );
};

export default PriceInfoCard;
