from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey

from app import db

class Company(db.Model):

    __tablename__ = "company"

    id = Column(Integer, primary_key=True)
    verified = Column(Boolean(), default=False, nullable=False)
    paid_subscription = Column(Boolean(), default=False, nullable=False)
    name = Column(String(128), unique=True, nullable=False)
    description = Column(String(5000), nullable=False)
    category = Column(String(128), nullable=False)
    location = Column(String(128), nullable=False)
    employee_count = Column(String(128), nullable=False)
    logo_url = Column(String(256), nullable=False)
    contact_email = Column(String(128), nullable=False)
    website = Column(String(128), nullable=False)

    reviews = db.relationship("Review", backref='company')


    def __init__(self, name, description, category, location, employee_count, logo_url, contact_email, website):
        self.name = name
        self.description = description
        self.category = category
        self.location = location
        self.employee_count = employee_count
        self.logo_url = logo_url
        self.contact_email = contact_email
        self.website = website

    @staticmethod
    def create_company(name, description, category, location, employee_count, logo_url, contact_email, website):
        company = Company(
            name=name,
            description=description,
            category=category,
            location=location,
            employee_count=employee_count,
            logo_url=logo_url,
            contact_email=contact_email,
            website=website,
        )
        try:
            db.session.add(company)
            return True
        except:
            return False

    @staticmethod
    def get_company_by_name(name):
        company = db.session.query(Company).filter(Company.name.ilike(f'%{name}%')).first()
        if company:
            return company
        else:
            return None

    @staticmethod
    def get_all_companies():
        companies = Company.query.filter_by().all()
        if companies:
            return companies
        else:
            return None

    @staticmethod
    def get_companies_by_search(name):
        companies = db.session.query(Company).filter(Company.name.ilike(f'%{name}%')).all()
        if companies:
            return companies
        else:
            return None

    @staticmethod
    def get_companies_by_category(category):
        if category == "all":
            companies = Company.get_all_companies()
        else:
            companies = db.session.query(Company).filter(Company.category.ilike(f'%{category}%')).all()
        if companies:
            return companies
        else:
            return None      

    def set_verified(self):
        self.verified = True

    def set_paid_subscription(self):
        self.paid_subscription = True
    
    @property
    def serialize(self):
        return {
            'id'                    :self.id,
            'verified'              :self.verified,
            'paid_subscription'     :self.paid_subscription,
            'name'                  :self.name,
            'description'           :self.description,
            'location'              :self.location,
            'employee_count'        :self.employee_count,
            'logo_url'              :self.logo_url,
            'contact_email'         :self.contact_email,
            'website'               :self.website,
            'category'              :self.category,
        }

class Review(db.Model):

    __tablename__ = "review"

    id = Column(Integer, primary_key=True)
    verified = Column(Boolean(), default=False, nullable=False)
    reviewed_company = Column(String(128), ForeignKey('company.name'), nullable=False)
    reviewer_name = Column(String(128), nullable=False)
    reviewer_company = Column(String(128), nullable=False)
    reviewer_title = Column(String(128), nullable=False)
    date = Column(DateTime, nullable=False)
    rating = Column(Integer, nullable=False)
    description = Column(String(5000), nullable=False)

    def __init__(self, reviewer_name, reviewer_company, reviewer_title, date, rating, description, company):
        self.reviewer_name = reviewer_name
        self.reviewer_company = reviewer_company
        self.reviewer_title = reviewer_title
        self.date = date
        self.rating = rating
        self.description = description
        self.company = company

    @staticmethod
    def create_review(reviewer_name, reviewer_company, reviewer_title, date, rating, description, company):
        review = Review(
            reviewer_name=reviewer_name,
            reviewer_company=reviewer_company,
            reviewer_title=reviewer_title,
            date=date,
            rating=rating,
            description=description,
            company=company
        )
        try:
            db.session.add(review)
            return True
        except:
            return False

    @staticmethod
    def get_reviews_by_reviewed_company(reviewed_company):
        reviews = db.session.query(Review).filter(Review.reviewed_company.ilike(f'%{reviewed_company}%')).all()
        if reviews:
            return reviews
        else:
            return None

    def set_verified(self):
        self.verified = True
    
    @property
    def serialize(self):
        return {
            'id'                  :self.id,
            'verified'            :self.verified,
            'reviewed_company'    :self.reviewed_company,
            'reviewer_name'       :self.reviewer_name,
            'reviewer_company'    :self.reviewer_company,
            'reviewer_title'      :self.reviewer_title,
            'date'                :self.date,
            'rating'              :self.rating,
            'description'         :self.description
        }
