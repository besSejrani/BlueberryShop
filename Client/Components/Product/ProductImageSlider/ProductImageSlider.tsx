import React, { useState } from "react";

// Material-UI
import theme from "../../../Layout/Theme";
import { Button, Card, MobileStepper, CardActionArea } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Icons
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

// Libraries
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

// ========================================================================================================

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const ProductSlider = ({ product }) => {
  const classes = useStyles();

  // State
  const [activeStep, setActiveStep] = useState(0);

  let maxSteps = product?.productImages.length;

  // Events
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <>
      {product?.productImages.length > 0 ? (
        <Card style={{ borderRadius: "10px" }}>
          <AutoPlaySwipeableViews
            interval={3500}
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            style={{ width: "100%" }}
          >
            {product?.productImages.map((product, index) => {
              return (
                <CardActionArea key={index} className={classes.area} disableRipple>
                  <img width={520} height={350} src={`${product}`} title={product.title} alt={product.label} />
                </CardActionArea>
              );
            })}
          </AutoPlaySwipeableViews>
          <MobileStepper
            style={{ background: "none" }}
            steps={maxSteps}
            position="static"
            variant="dots"
            activeStep={activeStep}
            nextButton={
              <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                Next
                {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            }
            backButton={
              <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                Back
              </Button>
            }
          />
        </Card>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProductSlider;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    area: {
      display: "flex",
      backgroundColor: "#fafafa",
      height: "100%",
      width: "100%",
    },
  })
);
