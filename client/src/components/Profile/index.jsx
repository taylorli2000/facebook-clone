import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Paper,
  Typography,
} from "@mui/material";
import { useAuth } from "../../hooks/useAuth";
import { useRequireAuth } from "../../hooks/useRequireAuth";

export const Profile = () => {
  const token = useRequireAuth();
  const { user } = useAuth();

  return (
    <>
      {token && (
        <Paper
          elevation={3}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            width: { xs: 0.9, sm: 0.75, md: 0.65 },
            my: 5,
          }}
        >
          <Avatar
            sx={{
              height: { xs: 75, sm: 100, md: 125 },
              width: { xs: 75, sm: 100, md: 125 },
              my: 2,
            }}
          />
          <Typography gutterBottom variant="h4" component="div">
            {user.username}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexGrow: 1,
              mt: 2,
              width: 1,
            }}
          >
            <Card sx={{ mb: 2, maxWidth: { xs: 0.9, sm: 0.75, md: 0.65 } }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizards
                  </Typography>
                  <Typography variant="body2" color="text.secondary" noWrap>
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species, ranging across all continents except
                    Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="warning">
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Paper>
      )}
    </>
  );
};
