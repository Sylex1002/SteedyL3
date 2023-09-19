import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllZoneAction } from "../../Actions/ActionZone";
import { GET_ALL_ZONE_LIST } from "../../Reducers/ReducerZone";
import CardZone from "../components/CardZone";
// import image1 from "../../Images/user.png";
// import image2 from "../../Images/user.png";
// import image3 from "../../Images/user.png";

//for an example
import "./style/Zone.scss";
import LayoutEtudiant from "../Layout/LayoutEtudiant";
// const zones = [
//   {
//     id: 1,
//     topic: "Apprendre le Java",
//     description: "Java tutoriel de A à Z pour les débutans",
//     creator: {
//       id: 1,
//       name: "Jean de Dieu",
//       avatar: image1,
//     },
//     intervenants: [
//       {
//         id: 1,
//         name: "Jean de Dieu",
//         avatar: image1,
//       },
//       {
//         id: 2,
//         name: "Leboto",
//         avatar: image2,
//       },
//       {
//         id: 3,
//         name: "Tarondro Mec",
//         avatar: image3,
//       },
//     ],
//     totalPeople: 45,
//     status: 0,
//   },
// ];

export default function Zone() {
  const dispatch = useDispatch();
  const zone_list = useSelector(GET_ALL_ZONE_LIST);

  //get all zone
  useEffect(() => {
    return async () => {
      await dispatch(getAllZoneAction());
    };
  }, [dispatch]);

  return (
    <LayoutEtudiant>
      <div id="Zone">
        <div className="cardZone">
          {zone_list.map((zone) => (
            <CardZone key={zone.id} zone={zone} />
          ))}
        </div>
      </div>
    </LayoutEtudiant>
  );
}
