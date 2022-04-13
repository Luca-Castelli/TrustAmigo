from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, and_, func

from app import db

class Company(db.Model):

    __tablename__ = "company"

    id = Column(Integer, primary_key=True)
    name = Column(String(128), unique=True, nullable=False)
    description = Column(String(5000))
    category = Column(String(128))
    location = Column(String(128))
    employee_count = Column(String(128))
    logo_url = Column(String(256))
    contact_email = Column(String(128))
    website = Column(String(128))
    crunchbase_url = Column(String(128))
    verified = Column(Boolean(), default=False, nullable=False)
    paid_subscription = Column(Boolean(), default=False, nullable=False)

    reviews = db.relationship("Review", backref='company')

    def __init__(self, name, description, category, location, employee_count, logo_url, contact_email, website, crunchbase_url):
        self.name = name
        self.description = description
        self.category = category
        self.location = location
        self.employee_count = employee_count
        self.logo_url = logo_url
        self.contact_email = contact_email
        self.website = website
        self.crunchbase_url = crunchbase_url

    @staticmethod
    def create_company(name, description, category, location, employee_count, logo_url, contact_email, website, crunchbase_url):
        company = Company(
            name=name,
            description=description,
            category=category,
            location=location,
            employee_count=employee_count,
            logo_url=logo_url,
            contact_email=contact_email,
            website=website,
            crunchbase_url=crunchbase_url,
        )
        try:
            db.session.add(company)
            return company
        except:
            return None

    @staticmethod
    def get_verified_companies():
        companies = db.session.query(Company).filter(Company.verified==True).all()
        if companies:
            return companies
        else:
            return None

    @staticmethod
    def get_unverified_companies():
        companies = db.session.query(Company).filter(Company.verified==False).all()
        if companies:
            return companies
        else:
            return None

    @staticmethod
    def get_verified_company_by_name(name):
        company = db.session.query(Company).filter(and_(Company.name.ilike(f'%{name}%'), Company.verified==True)).first()
        if company:
            return company
        else:
            return None

    @staticmethod
    def get_verified_companies_by_search(name):
        companies = db.session.query(Company).filter(and_(func.lower(Company.name).startswith(name.lower()), Company.verified==True)).all()
        if companies:
            return companies
        else:
            return None

    @staticmethod
    def get_verified_companies_by_category(category):
        if category == "all":
            companies = Company.get_verified_companies()
        else:
            companies = db.session.query(Company).filter(and_(Company.category.ilike(f'%{category}%'), Company.verified==True)).all()
        if companies:
            return companies
        else:
            return None      

    def set_verified(self):
        self.verified = True
        return True

    def set_paid_subscription(self):
        self.paid_subscription = True
        return True
    
    @property
    def serialize(self):
        return {
            'id'                    :self.id,
            'name'                  :self.name,
            'description'           :self.description,
            'category'              :self.category,
            'location'              :self.location,
            'employee_count'        :self.employee_count,
            'logo_url'              :self.logo_url,
            'contact_email'         :self.contact_email,
            'website'               :self.website,
            'crunchbase_url'        :self.crunchbase_url,
            'verified'              :self.verified,
            'paid_subscription'     :self.paid_subscription,
        }

class Review(db.Model):

    __tablename__ = "review"

    id = Column(Integer, primary_key=True)
    reviewed_company = Column(String(128), ForeignKey('company.name'), nullable=False)
    reviewer_name = Column(String(128), nullable=False)
    reviewer_company = Column(String(128), nullable=False)
    reviewer_title = Column(String(128), nullable=False)
    date = Column(DateTime, nullable=False)
    rating = Column(Integer, nullable=False)
    description = Column(String(5000), nullable=False)
    verified = Column(Boolean(), default=False, nullable=False)

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
            return review
        except:
            return None

    @staticmethod
    def get_review_by_id(review_id):
        review = db.session.query(Review).filter(Review.id == review_id).first()
        if review:
            return review
        else:
            return None 

    @staticmethod
    def get_verified_reviews_by_reviewed_company(reviewed_company):
        reviews = db.session.query(Review).filter(and_(Review.reviewed_company.ilike(f'%{reviewed_company}%'), Review.verified == True)).all()
        if reviews:
            return reviews
        else:
            return None

    @staticmethod
    def get_unverified_reviews():
        reviews = db.session.query(Review).filter(Review.verified == False).all()
        if reviews:
            return reviews
        else:
            return None

    @staticmethod
    def delete_review_by_id(review_id):
        try:
            db.session.query(Review).filter(Review.id == review_id).delete()
            return True
        except:
            return False

    @staticmethod
    def calculate_average_rating(reviewed_company):
        avg_rating = db.session.query((func.avg(Review.rating).label('avg_rating'))).filter(and_(Review.reviewed_company.ilike(f'%{reviewed_company}%'), Review.verified == True)).first()
        try:
            return float(avg_rating[0])
        except:
            return False
    
    def set_verified(self):
        self.verified = True
        return True
        
    @property
    def serialize(self):
        return {
            'id'                  :self.id,
            'reviewed_company'    :self.reviewed_company,
            'reviewer_name'       :self.reviewer_name,
            'reviewer_company'    :self.reviewer_company,
            'reviewer_title'      :self.reviewer_title,
            'date'                :self.date,
            'rating'              :self.rating,
            'description'         :self.description,
            'verified'            :self.verified
        }


class Contact_Request(db.Model):

    __tablename__ = "contact_request"

    id = Column(Integer, primary_key=True)
    created_date = Column(DateTime, nullable=False)
    last_updated_date = Column(DateTime, nullable=False)
    first_name = Column(String(128), nullable=False)
    last_name = Column(String(128), nullable=False)
    company_name = Column(String(128), nullable=False)
    email = Column(String(128), nullable=False)
    classification = Column(String(128), nullable=False)
    status = Column(String(128), default="New", nullable=False)

    def __init__(self, created_date, last_updated_date, first_name, last_name, company_name, email, classification):
        self.created_date = created_date
        self.last_updated_date = last_updated_date     
        self.first_name = first_name
        self.last_name = last_name
        self.company_name = company_name
        self.email = email
        self.classification = classification

    @staticmethod
    def create_contact_request(created_date, last_updated_date, first_name, last_name, company_name, email, classification):
        contact_request = Contact_Request(
            created_date=created_date,
            last_updated_date=last_updated_date,
            first_name=first_name,
            last_name=last_name,
            company_name=company_name,
            email=email,
            classification=classification
        )
        try:
            db.session.add(contact_request)
            return contact_request
        except:
            return None

    @staticmethod
    def get_all_contact_requests():
        contact_requests = db.session.query(Contact_Request).all()
        if contact_requests:
            return contact_requests
        else:
            return None
    
    @staticmethod
    def get_contact_request_by_id(request_id):
        contact_request = db.session.query(Contact_Request).filter(Contact_Request.id == request_id).first()
        if contact_request:
            return contact_request
        else:
            return None 

    def set_status(self, new_status):
        self.status = new_status
        return True
    
    def set_last_updated_date(self, new_last_updated_date):
        self.last_updated_date = new_last_updated_date
        return True

    @property
    def serialize(self):
        return {
            'id'                    :self.id,
            'created_date'          :self.created_date,
            'last_updated_date'     :self.last_updated_date,
            'first_name'            :self.first_name,
            'last_name'             :self.last_name,
            'company_name'          :self.company_name,
            'email'                 :self.email,
            'classification'        :self.classification,
            'status'                :self.status,            
        }