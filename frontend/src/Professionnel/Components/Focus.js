import React, { useContext, useEffect } from "react";
import "./styles/Focus.scss";
import { motion } from "framer-motion";
import { Grid, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GET_FOCUS_FOLLOW_PROF, GET_FOCUS_FOLLOW_PROF_ACTIVE } from "../../Reducers/ReducerFocus";
import {  get_focus_ofProf_followByPro } from "../../Actions/ActionFocus";
import { AppContext } from "../../Context/AppContext";
import CardFocus from "../../Etudiant/components/CardFocus";

export default function Focus() {
  // States
  const { Uuid} = useContext(AppContext);
  const dispatch = useDispatch();

  // focus
  const focus_list_active = useSelector(GET_FOCUS_FOLLOW_PROF_ACTIVE);
  const focus_list = useSelector(GET_FOCUS_FOLLOW_PROF);

  // get all focus of prof
  useEffect(() => {
    if (Uuid) {
      if (focus_list_active === false) {
        dispatch(get_focus_ofProf_followByPro(Uuid));
      }
    }
  }, [dispatch, Uuid, focus_list_active]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="focus"
    >
      <Stack direction="column" spacing="45px">
        <motion.div
          initial={{ translateX: "-100px" }}
          animate={{ translateX: 0 }}
          transition={{ duration: 0.6 }}
          className="title"
        >
          <Stack direction="column" spacing="8px">
            <p>Mes focus</p>
            <div className="trait"></div>
          </Stack>
        </motion.div>

        <motion.div
          initial={{ translateY: "100px" }}
          animate={{ translateY: 0 }}
          transition={{ duration: 0.6 }}
          className="focus-content"
        >
          <Grid container spacing="24px">
            {focus_list.map((focus, index) => {
              return (
                <Grid key={index} item md={4}>
                  <div className="focus-element">
                    <CardFocus focus={focus}  maximWidth={"auto"} />
                  </div>
                </Grid>
              );
            })}
          </Grid>
        </motion.div>
      </Stack>
    </motion.div>
  );
}
