import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles, withStyles } from "@material-ui/core/styles";
// @material-ui/icons

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/material-kit-react/views/profilePage.js";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Authcontext } from "../../context/auth-context";
import ErrorModel from "../../models/error-model";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(styles, {
  table: {
    minWidth: 700,
  },
});
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export default function ListEnfant(props) {
  const classes = useStyles();
  const { ...rest } = props;

  const [enfants, setEnfants] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const auth = useContext(Authcontext);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/enfant/jardin/${auth.userId}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setEnfants(responseData.enfants);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  return (
    <div>
      <Header
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white",
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} className={classes.navWrapper}>
                <ErrorModel error={error} />
                {enfants && (
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      aria-label="customized table"
                    >
                      <TableHead>
                        <TableRow>
                          <StyledTableCell>Nom</StyledTableCell>
                          <StyledTableCell align="right">
                            Prenom
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Date de naissance
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            Action
                          </StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {enfants.map((row) => (
                          <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row">
                              {row.nom}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.prenom}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              {row.Dnaissance}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                              <Button variant="outlined" color="primary">
                                Consulter
                              </Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
