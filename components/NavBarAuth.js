/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>One Look</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* CLOSE NAVBAR ON LINK SELECTION: https://stackoverflow.com/questions/72813635/collapse-on-select-react-bootstrap-navbar-with-nextjs-not-working */}
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href="/user">
              <Nav.Link>User</Nav.Link>
            </Link>
            <Link passHref href="/profile/new">
              <Nav.Link>Create Profile</Nav.Link>
            </Link>
            <Link passHref href="/expense/expenses">
              <Nav.Link>Expenses</Nav.Link>
            </Link>
            <Link passHref href="/expense/new">
              <Nav.Link>Create Expenses</Nav.Link>
            </Link>
            <Link passHref href="/profile/profile">
              <Nav.Link>Profiles</Nav.Link>
            </Link>
            <Link passHref href="/members/member">
              <Nav.Link>Expense Report</Nav.Link>
            </Link>
            <Link passHref href="/profileNameTest">
              <Nav.Link>Test name</Nav.Link>
            </Link>
            <Button variant="danger" onClick={signOut}>Sign Out</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
