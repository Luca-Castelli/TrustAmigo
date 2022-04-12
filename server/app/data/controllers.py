from datetime import datetime
import json
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

from app import db
from app.data.models import Company, Review, Contact_Request

data = Blueprint('data', __name__)


@data.route("/api/data/company/<string:company_name>", methods=["GET"])
def get_verified_company_by_company_name(company_name):
    company = Company.get_verified_company_by_name(name=company_name)
    avg_rating = Review.calculate_average_rating(reviewed_company=company_name)
    company = company.serialize
    company['avg_rating'] = avg_rating
    if company:
        return company, 200
    else:
        return jsonify(None), 403

@data.route("/api/data/company/search/<string:company_name>", methods=["GET"])
def get_company_by_search(company_name):
    companies = Company.get_verified_companies_by_search(name=company_name)
    li = []
    if companies:
        for company in companies:
            avg_rating = Review.calculate_average_rating(reviewed_company=company.name)
            company = company.serialize
            company['avg_rating'] = avg_rating
            li.append(company)
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/review/<string:company_name>", methods=["GET"])
def get_verified_reviews_by_reviewed_company(company_name):
    reviews = Review.get_verified_reviews_by_reviewed_company(reviewed_company=company_name)
    li = []
    if reviews:
        for review in reviews:
            li.append(review.serialize)
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/review/pending", methods=["GET"])
def get_unverified_reviews():
    reviews = Review.get_unverified_reviews()
    li = []
    if reviews:
        for review in reviews:
            li.append(review.serialize)
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/review/submit", methods=["POST"])
def add_review():
    reviewed_company = request.json.get("reviewed_company", None)
    reviewer_name = request.json.get("reviewer_name", None)
    reviewer_company = request.json.get("reviewer_company", None)
    reviewer_title = request.json.get("reviewer_title", None)
    rating = request.json.get("rating", None)
    description = request.json.get("description", None)

    date = datetime.today()
    company = Company.get_verified_company_by_name(name=reviewed_company)

    if Review.create_review(reviewer_name=reviewer_name, reviewer_company=reviewer_company, 
        reviewer_title=reviewer_title, date=date, rating=rating, description=description, 
        company=company):
        db.session.commit()
        return jsonify(None), 200
    else:
        return jsonify(None), 403 

@data.route("/api/data/review/approve", methods=["POST"])
def approve_review():
    review_id = request.json.get("review_id", None)
    review = Review.get_review_by_id(review_id=review_id)
    if review.set_verified():
        db.session.commit()
        return jsonify(None), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/review/delete", methods=["POST"])
def delete_review():
    review_id = request.json.get("review_id", None)
    if Review.delete_review_by_id(review_id=review_id):
        db.session.commit()
        return jsonify(None), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/category/<string:category_name>", methods=["GET"])
def get_companies_by_category(category_name):
    companies = Company.get_verified_companies_by_category(category=category_name)
    li = []
    if companies:
        for company in companies:
            avg_rating = Review.calculate_average_rating(reviewed_company=company.name)
            company = company.serialize
            company['avg_rating'] = avg_rating
            li.append(company)
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/contact", methods=["GET"])
def get_contact_requests():
    contact_requests = Contact_Request.get_all_contact_requests()
    li = []
    if contact_requests:
        for contact_request in contact_requests:
            li.append(contact_request.serialize)
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/contact/submit", methods=["POST"])
def handle_contact_request():
    first_name = request.json.get("first_name", None)
    last_name = request.json.get("last_name", None)
    company_name = request.json.get("company_name", None)
    email = request.json.get("email", None)
    classification = request.json.get("classification", None)

    date = datetime.today()

    if Contact_Request.create_contact_request(date=date, first_name=first_name, last_name=last_name, company_name=company_name, email=email, classification=classification):
        db.session.commit()
        return jsonify(None), 200
    else:
        return jsonify(None), 403 