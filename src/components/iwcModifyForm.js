import React, { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  Button,
  Input,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  verticalSlider: {
    height: 500,
  },
  input: {
    width: 142,
  },
  formControl: {
    minWidth: 120,
  },
})

const IWCModifyForm = ({ updateWidth, updateType, updateHeight }) => {
  const classes = useStyles()
  const [width, setwidth] = useState(100)
  const [type, settype] = useState("inline-embed")
  const [height, setHeight] = useState(400)
  const [radio, setradio] = useState("%")

  const handelInputWidthChange = (event, newValue) => {
    setwidth(event.target.value)
    updateWidth(event.target.value + radio)
  }

  const handelInputHeightChange = (event, newValue) => {
    setHeight(event.target.value)
    updateHeight(event.target.value + "px")
  }

  const handleSubmit = (event, newValue) => {
    console.log("width + radio: ", width + radio)
    console.log("height: ", height + "px")
    updateWidth(width + radio)
    updateHeight(height)
  }

  const handleRadioChange = (event, newValue) => {
    setradio(newValue)
    updateWidth(width + newValue)
  }

  const handleTypeChange = (event, newValue) => {
    settype(event.target.value)
    updateType(event.target.value)
  }

  return (
    <form className={classes.root}>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>
            <Typography id="width-input" gutterBottom>
              Width
            </Typography>

            <Input
              inputProps={{ "aria-label": "description" }}
              onChange={handelInputWidthChange}
              value={width}
            />
          </Grid>
          <Grid item>
            <FormControl component="fieldset" className={classes.formControl}>
              <RadioGroup
                aria-label="units"
                name="units"
                value={radio}
                onChange={handleRadioChange}
              >
                <FormControlLabel value="px" control={<Radio />} label="px" />
                <FormControlLabel value="%" control={<Radio />} label="%" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            <Typography id="height-input" gutterBottom>
              Height
            </Typography>

            <Input
              defaultValue=""
              inputProps={{ "aria-label": "description" }}
              onChange={handelInputHeightChange}
              value={height}
            />
          </Grid>
          <Grid>
            <FormControl className={classes.formControl}>
              <InputLabel id="simple-select-autowidth-label">
                Embed Type
              </InputLabel>
              <Select
                labelId="simple-select-autowidth-label"
                id="simple-select-autowidth"
                value={type}
                onChange={handleTypeChange}
                autoWidth
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="inline-embed">Inline Embed</MenuItem>
                <MenuItem value="hover-panel">Hover Panel</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            Update
          </Button>
        </Grid>
      </Typography>

      {/* <Slider
        value={typeof width === "number" ? width : 100}
        onChange={handleSliderChange}
        defaultValue={100}
        aria-labelledby="discrete-slider-small-steps"
        getAriaValueText={valuetext}
        step={1}
        min={10}
        max={100}
        marks={marks}
        valueLabelDisplay="on"
      /> */}
      {/* <div className={classes.verticalSlider}>
        <Slider
          orientation="vertical"
          getAriaValueText={valuetext}
          defaultValue={250}
          onChange={handleVerticalSliderChange}
          step={25}
          min={150}
          max={800}
          aria-labelledby="vertical-slider"
          valueLabelDisplay="on"
        />
      </div> */}
    </form>
  )
}

export default IWCModifyForm
