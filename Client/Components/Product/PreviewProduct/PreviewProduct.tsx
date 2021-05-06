import React, { useState } from "react";

// Material-UI
import { Box, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";

// Icons
import DeleteIcon from "@material-ui/icons/Delete";

// Components
import ProductImageSLider from "@Components/Product/ProductImageSlider/ProductImageSlider";

// GraphQL
import { useDeleteProductImageMutation } from "@Graphql/index";

// ========================================================================================================

type Preview = {
  product: any;
  images?: any;
  router?: string | string[];
};

const PreviewProduct: React.FC<Preview> = ({ product, images, router }) => {
  const classes = useStyles();

  // GraphQL
  const [deleteProductImage] = useDeleteProductImageMutation();

  // State
  const [show, setShow] = useState(false);

  // Delete Product Image
  const deleteImage = async (key) => {
    await deleteProductImage({ variables: { productId: router as string, keyId: key } });
  };

  return (
    <Box className={classes.root}>
      <ProductImageSLider product={product} />
      <Box className={classes.productImagesGroup} onMouseLeave={() => setShow(false)}>
        {images?.map((image) => (
          <Box className={classes.productImagesGroup}>
            <img src={image} alt={image} className={classes.productImage} onMouseEnter={() => setShow(true)} />
            {show ? (
              <>
                <IconButton className={classes.deleteProductImage} onClick={() => deleteImage(image)}>
                  <DeleteIcon />
                </IconButton>
              </>
            ) : (
              <></>
            )}
          </Box>
        ),
        )}
      </Box>
    </Box>
  );
};

export default PreviewProduct;

// ========================================================================================================

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexDirection: "column",
      width: "100%",
      padding: "0px 20px 0px 0px",
    },

    media: {
      height: "50%",
    },

    productImagesGroup: {
      display: "flex",
      position: "relative",
      margin: "25px 0px 15px 0px",
    },

    productImage: {
      height: 100,
      width: 100,
      margin: "0px 15px 0px 0px",
    },

    deleteProductImage: {
      position: "absolute",
      right: -15,
      top: -15,
      cursor: "pointer",
    },
  }),
);
