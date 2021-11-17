import CampCard from './CampCard';
import CampsMain from './CampsMain';
import { campgroundsData } from '../utils/staticDB/campsData.js';

const CampgroundsPage = () => {
  return (
    <>
      <CampsMain />
      {campgroundsData.map((camp) => {
        return (
          <CampCard
            key={camp.id}
            title={camp.title}
            image={camp.image}
            name={camp.name}
            campgroundId={camp.campgroundId}
          />
        );
      })}
    </>
  );
};

export default CampgroundsPage;
