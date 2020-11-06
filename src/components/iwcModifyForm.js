import React, { useState, useEffect } from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from "@material-ui/core"

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  verticalSlider: {
    height: 300,
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
  const [width, setwidth] = useState("50%")
  const [type, settype] = useState("inline-embed")
  const [height, setHeight] = useState(250)

  useEffect(() => {
    settype(type)
    setHeight(height)
    setwidth(width)
    return () => {}
  }, [])

  const handleSliderChange = (event, newValue) => {
    setwidth(newValue)
    updateWidth(width + "%")
  }

  const handleVerticalSliderChange = (event, newValue) => {
    setHeight(newValue)
    updateHeight(height)
  }

  const handleTypeChange = (event, newValue) => {
    settype(event.target.value)
    updateType(event.target.value)
  }

  function valuetext(value) {
    return `${value}%`
  }

  return (
    <form className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        Width
      </Typography>
      <Slider
        value={typeof width === "number" ? width : 100}
        onChange={handleSliderChange}
        defaultValue={100}
        aria-labelledby="discrete-slider-small-steps"
        getAriaValueText={valuetext}
        step={1}
        min={10}
        max={100}
        valueLabelDisplay="on"
      />
      <Typography id="vertical-slider" gutterBottom>
        Height
      </Typography>
      <div className={classes.verticalSlider}>
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
      </div>

      <FormControl className={classes.formControl}>
        <InputLabel id="simple-select-autowidth-label">Embed Type</InputLabel>
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
    </form>
  )
}

export default IWCModifyForm
