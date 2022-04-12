from decimal import Decimal
from datetime import datetime
from flask.cli import FlaskGroup

from app import app, db
from app.auth.models import Users
from app.data.models import Company, Review, Contact_Request


cli = FlaskGroup(app)

@cli.command("create_db")
def create_db():
    db.drop_all()
    db.create_all()
    db.session.commit()

@cli.command("seed_users")
def seed_users():
    email = "luca.p.castelli@gmail.com"
    password = "test"
    first_name = "luca"
    last_name = "castelli"
    employer = "td"
    if Users.create_user(username=email, password=password, first_name=first_name, last_name=last_name, employer=employer):
        db.session.commit()

    email = "sabena.quan@gmail.com"
    password = "pass"
    first_name = "sabena"
    last_name = "quan"
    employer = "jeeves"
    if Users.create_user(username=email, password=password, first_name=first_name, last_name=last_name, employer=employer):
        db.session.commit()

@cli.command("seed_company")
def seed_company():
    name = "Jeeves"
    description = "Credit card services for start-ups all over the world."
    category = "Analytics"
    location = "Mexico"
    employee_count = "0-99"
    logo_url = "https://bookface-images.s3.amazonaws.com/logos/092548f7d00ef7086684ba978c12e2cd72eaa34a.png?1620136807"
    contact_email = "info@jeeves.com"
    website = "https://jeeves.webflow.io/"
    company = Company.create_company(name=name, description=description, category=category, location=location, employee_count=employee_count, logo_url=logo_url, contact_email=contact_email, website=website)
    company.set_verified()
    db.session.commit()

    name = "HubSpot"
    description = "CRM service for smaller scale companies."
    category = "Sales"
    location = "Canada"
    employee_count = "5000+"
    logo_url = "https://e7.pngegg.com/pngimages/281/858/png-clipart-logo-hubspot-inc-marketing-asg-capital-group-pty-ltd-brand-marketing-text-orange.png"
    contact_email = "info@hubspot.com"
    website = "https://www.hubspot.com/"
    company = Company.create_company(name=name, description=description, category=category, location=location, employee_count=employee_count, logo_url=logo_url, contact_email=contact_email, website=website)
    company.set_verified()
    db.session.commit()

@cli.command("seed_review")
def seed_review():
    reviewed_company = Company.query.filter_by(name="Jeeves").first()
    reviewer_name = "Luca"
    reviewer_company = "TD"
    reviewer_title = "VP"
    date = datetime(2022,3,28)
    rating = 5
    description = "Love Jeeves. Use it all the time."
    if Review.create_review(reviewer_name=reviewer_name, reviewer_company=reviewer_company, reviewer_title=reviewer_title, date=date, rating=rating, description=description, company=reviewed_company):
        db.session.commit()

    reviewed_company = Company.query.filter_by(name="Jeeves").first()
    reviewer_name = "Sabena"
    reviewer_company = "Flow Cap"
    reviewer_title = "Marketing Manager"
    date = datetime(2022,3,11)
    rating = 5
    description = "Wow. Just wow."
    if Review.create_review(reviewer_name=reviewer_name, reviewer_company=reviewer_company, reviewer_title=reviewer_title, date=date, rating=rating, description=description, company=reviewed_company):
        db.session.commit()

    reviewed_company = Company.query.filter_by(name="HubSpot").first()
    reviewer_name = "John"
    reviewer_company = "RBC"
    reviewer_title = "Sales"
    date = datetime(2022,3,1)
    rating = 1
    description = "Garbage product."
    if Review.create_review(reviewer_name=reviewer_name, reviewer_company=reviewer_company, reviewer_title=reviewer_title, date=date, rating=rating, description=description, company=reviewed_company):
        db.session.commit()

@cli.command("seed_contact_request")
def seed_contact_request():
    date = datetime(2022,3,1)
    first_name = "Luca"
    last_name = "Castelli"
    company_name = "TD"
    email = "luca.p.castelli@gmail.com"
    classification = "New Listing"
    if Contact_Request.create_contact_request(date=date, first_name=first_name, last_name=last_name, company_name=company_name, email=email, classification=classification):
        db.session.commit()
        
if __name__ == "__main__":
    cli()
