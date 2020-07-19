import Button from "@material-ui/core/Button";
import { DialogActions, Box ,TextField} from "@material-ui/core";
import { Formik } from "formik";
import * as yup from "yup";
import PropTypes from "prop-types";
import {
  FormControl,
  FormGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  InputLabel,
  FormHelperText
} from "@material-ui/core";

import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Chip } from "@material-ui/core";
import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";

const initialValues = {};
const validationSchema = yup.object({});

const mystyle = {
  color: "black",
  backgroundColor: "#00bfff"
};
const buttonStyle = {
  color: "black",
  marginTop: 5,
  marginRight: 12,
  backgroundColor: "#00bfff"
};
const chipsStyle = {
  ...buttonStyle
};

export default function LeftFilter(props) {
  const [state, setState] = useState({
    filterTitle: "",
    filterSkill: "",
    filterTitleList: [],
    filterSkillList: [],
    filterJobSites: ["Dice", "Monster", "LinkedIn", "Career Builder"],
    selectedFilterJobSites: []
  });
  
  const handleDelete = (listName, e) => {
    console.log(state[listName]);
    state[listName].splice(state[listName].indexOf(e), 1);
    setState({ ...state, [listName]: state[listName] });
  };
  
  
  const handleChange = e => {
   const { target, keyCode } = e;
   const { name, value } = target;
    setState({ ...state, [name]: value });
  };
 
  const handleKeyUp = e => {
   const { target, keyCode } = e;
    const { name, value } = target;
    if (keyCode === 13) {
      state[name + "List"].push(value);
      setState({ ...state, [name]: "", [name + "List"]: state[name + "List"] });
    }
  };
  const handleCheckBox = e => {
    const { target ,keyCode} = e;
   const { name, value } = target;
    const index = state.selectedFilterJobSites.indexOf(value);
    if(index===-1){
      state.selectedFilterJobSites.push(value);
    } else {
      state.selectedFilterJobSites.splice(index,1);
    }
    setState({...state});
  }
  
  const handleSearchIcon = () => {
    alert("You clicked the delete icon.");
  };
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues}>
      {formikProps => {
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              console.log(e);
            }}
          >
            <div>
              <InputLabel htmlFor="filterJOb" style={{ color: "Darkblue" }}>
                Filter the job by title
              </InputLabel>
              <TextField
                value={state.filterTitle}
                name="filterTitle"
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                id="filterJOb"
                aria-describedby="helper-text-forJOb"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon onClick={handleSearchIcon} />
                    </InputAdornment>
                  )
                }}
              />
              <FormHelperText
                id="helper-text-forJOb"
                style={{ paddingBottom: 4 }}
              >
                Filter the job by title
              </FormHelperText>
              {state.filterTitleList.map(item => (
                <Button variant="contained" size="small" style={buttonStyle}>
                  {item}
                </Button>
              ))}
            </div>

            <div>
              <TextField
                value={state.filterSkill}
                onKeyUp={handleKeyUp}
                onChange={handleChange}
                name="filterSkill"
                id="filterSkill"
                aria-describedby="my-helper-forSkill"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  )
                }}
              />
              <FormHelperText id="helper-text-forSkill">
                Filter by skill
              </FormHelperText>
            </div>
            <br />
            {state.filterSkillList.map(i => (
              <Chip
                size="medium"
                label={i}
                onDelete={() => handleDelete("filterSkillList", i)}
                style={chipsStyle}
              />
            ))}
            <div style={{ paddingTop: 40 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend" style={{ color: "#00bfff" }}>
                  Filter by other job sites
                </FormLabel>
                <Avatar
                  style={{
                    backgroundColor: "orange",
                    marginLeft: 180,
                    marginTop: -25
                  }}
                >
                  {state.selectedFilterJobSites.length}
                </Avatar>
                <FormGroup aria-label="position" style={{ color: "#00bfff" }}>
                  {state.filterJobSites.map(item => (
                    <FormControlLabel
                      value={item}
                      control={<Checkbox color="primary" />}
                      label={item}
                      labelPlacement="end"
                      onChange={handleCheckBox}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
LeftFilter.defaultProps = {
  handleClose: () => {}
};
LeftFilter.propTypes = {
  handleClose: PropTypes.func.isRequired
};
