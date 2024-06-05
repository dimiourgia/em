import { Box, Grid, InputBase, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = ({ open, setOpen }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          bgcolor: "rgba(0,0,0,0.5)",
        }}
      >
        <Grid
          container
          sx={{
            width: { lg: "800px", md: "700px", sm: "550px", xs: "300px" },
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            mt: "70px",
          }}
        >
          <Grid item xs={12} sx={{ bgcolor: "white", borderRadius: "5px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "2px",
              }}
            >
              <InputBase
                placeholder="Search here"
                sx={{ width: "700px", ml: "5px", border: "none", outline: "none" }}
              />
              <SearchIcon
                sx={{ fontSize: "30px", color: "black", mr: "3px" }}
              />
            </Box>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
};

export default Search;
