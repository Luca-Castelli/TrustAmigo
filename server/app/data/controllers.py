from datetime import datetime
import json
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user, login_required

from app import db
from app.data.models import Company, Review

data = Blueprint('data', __name__)

@data.route("/api/data/company/", methods=["GET"])
def get_all_companies():
    companies = Company.get_all_companies()
    li = []
    for company in companies:
        li.append(company.serialize)
    if companies:
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/company/<string:company_name>", methods=["GET"])
def get_company_by_company_name(company_name):
    company = Company.get_company_by_name(name=company_name)
    if company:
        return company.serialize, 200
    else:
        return jsonify(None), 403

@data.route("/api/data/company/search/<string:company_name>", methods=["GET"])
def get_company_by_search(company_name):
    companies = Company.get_companies_by_search(name=company_name)
    li = []
    for company in companies:
        li.append(company.serialize)
    if companies:
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/review/<string:company_name>", methods=["GET"])
def get_reviews_by_reviewed_company(company_name):
    reviews = Review.get_reviews_by_reviewed_company(reviewed_company=company_name)
    li = []
    for review in reviews:
        li.append(review.serialize)
    if reviews:
        return jsonify(li), 200
    else:
        return jsonify(None), 403

@data.route("/api/data/review/submit", methods=["POST"])
def post_review():
    reviewed_company = request.json.get("reviewed_company", None)
    reviewer_name = request.json.get("reviewer_name", None)
    reviewer_company = request.json.get("reviewer_company", None)
    reviewer_title = request.json.get("reviewer_title", None)
    rating = request.json.get("rating", None)
    description = request.json.get("description", None)

    date = datetime.today()
    company = Company.get_company_by_name(name=reviewed_company)

    print(reviewer_company)

    if Review.create_review(reviewer_name=reviewer_name, reviewer_company=reviewer_company, 
        reviewer_title=reviewer_title, date=date, rating=rating, description=description, 
        company=company):
        db.session.commit()
        return jsonify(None), 200
    else:
        return jsonify(None), 403 

@data.route("/api/data/category/<string:category_name>", methods=["GET"])
def get_companies_by_category(category_name):
    companies = Company.get_companies_by_category(category=category_name)
    li = []
    for company in companies:
        li.append(company.serialize)
    if companies:
        return jsonify(li), 200
    else:
        return jsonify(None), 403