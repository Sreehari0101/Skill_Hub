import React from "react";
import TitleCard from "../../Components/TitleCard";
import ProfileCard from "../../Components/ProfileCard";
import "./css/RecruitmentsView.css";
import profile_icon from "../../assets/Profile_icon.jpg";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
function RecruitmentsView() {
  return (
    <div className="Recruitments-view">
      <div className="Content-top">
        <div className="title-content">
          <TitleCard titleName="Applicants" />
        </div>

        <div className="profile-content">
          <ProfileCard userName="Richu Das" userIcon={profile_icon} />
        </div>
      </div>
      <div className="Content-bottom ">
        <Table
          removeWrapper
          aria-label="Example static collection table"
          className=" w-5/6"
        >
          <TableHeader>
            <TableColumn>Full Name</TableColumn>
            <TableColumn>Contact number</TableColumn>
            <TableColumn>Email Address</TableColumn>
            <TableColumn>Country</TableColumn>
            <TableColumn>State</TableColumn>
            <TableColumn>123 Main St</TableColumn>
            <TableColumn>Resume/CV</TableColumn>
            <TableColumn>Skill Hub Certificate</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>John Doe</TableCell>
              <TableCell>9876543210</TableCell>
              <TableCell>john.doe@example.com</TableCell>
              <TableCell>USA</TableCell>
              <TableCell>California</TableCell>
              <TableCell>123 Main St</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
            <TableRow key="2">
              <TableCell>Jane Smith</TableCell>
              <TableCell>1234567890</TableCell>
              <TableCell>jane.smith@example.com</TableCell>
              <TableCell>Canada</TableCell>
              <TableCell>Ontario</TableCell>
              <TableCell>456 Oak Ave</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
            <TableRow key="3">
              <TableCell>Alice Johnson</TableCell>
              <TableCell>8765432109</TableCell>
              <TableCell>alice.johnson@example.com</TableCell>
              <TableCell>UK</TableCell>
              <TableCell>London</TableCell>
              <TableCell>789 Pine Blvd</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
            <TableRow key="4">
              <TableCell>Bob Williams</TableCell>
              <TableCell>2345678901</TableCell>
              <TableCell>bob.williams@example.com</TableCell>
              <TableCell>Australia</TableCell>
              <TableCell>Sydney</TableCell>
              <TableCell>101 Maple Dr</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>

            <TableRow key="5">
              <TableCell>Charlie Brown</TableCell>
              <TableCell>7654321098</TableCell>
              <TableCell>charlie.brown@example.com</TableCell>
              <TableCell>Germany</TableCell>
              <TableCell>Tokyo</TableCell>
              <TableCell>202 Cedar Ln</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>

            <TableRow key="6">
              <TableCell>David Lee</TableCell>
              <TableCell>5432109876</TableCell>
              <TableCell>david.lee@example.com</TableCell>
              <TableCell>France</TableCell>
              <TableCell>Mumbai</TableCell>
              <TableCell>303 Elm Rd</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>

            <TableRow key="7">
              <TableCell>Eva Davis</TableCell>
              <TableCell>8901234567</TableCell>
              <TableCell>eva.davis@example.com</TableCell>
              <TableCell>Japan</TableCell>
              <TableCell>California</TableCell>
              <TableCell>404 Birch Ct</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>

            <TableRow key="8">
              <TableCell>Frank Miller</TableCell>cle
              <TableCell>4321098765</TableCell>
              <TableCell>frank.miller@example.com</TableCell>
              <TableCell>India</TableCell>
              <TableCell>Texas</TableCell>
              <TableCell>505 Spruce Ave</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
            <TableRow key="9">
              <TableCell>Grace Taylor</TableCell>
              <TableCell>1098765432</TableCell>
              <TableCell>grace.taylor@example.com</TableCell>
              <TableCell>Brazil</TableCell>
              <TableCell>New York</TableCell>
              <TableCell>606 Walnut Blvd</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
            <TableRow key="10">
              <TableCell>Henry Jones</TableCell>
              <TableCell>6789012345</TableCell>
              <TableCell>henry.jones@example.com</TableCell>
              <TableCell>China</TableCell>
              <TableCell>Florida</TableCell>
              <TableCell>707 Ash Dr</TableCell>
              <TableCell>None</TableCell>
              <TableCell>None</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RecruitmentsView;