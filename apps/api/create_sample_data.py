import os
import sys
import django

# Add the project root to the Python path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Set up Django environment
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PCCore.settings")
django.setup()

from airlines.models import Airline, AirlineReview
from decimal import Decimal


def create_sample_airlines():
    # Sample airlines data
    airlines_data = [
        {
            "name": "British Airways",
            "iata_code": "BA",
            "icao_code": "BAW",
            "callsign": "Speedbird",
            "country": "GB",
            "headquarters": "London, Heathrow",
            "hub_airports": "LHR, LGW",
            "destinations": 183,
            "fleet_size": 245,
            "fleet_types": "Boeing 777, Boeing 787, Airbus A320, Airbus A350, Airbus A380",
            "founded_year": 1974,
            "website": "https://www.britishairways.com",
            "is_hiring": True,
            "hiring_regions": "GB,US,DE,FR,IN",
            "pilot_requirements": "ATPL, 1500+ hours, Type rating on aircraft type\nICAO Level 4 English\nClass 1 Medical Certificate\nRight to work in UK",
            "pilot_salary_min": Decimal("85000"),
            "pilot_salary_max": Decimal("180000"),
            "cabin_crew_requirements": "Minimum height requirements\nSwimming ability\nCustomer service experience\nFlexibility with schedule",
            "cabin_crew_salary_min": Decimal("25000"),
            "cabin_crew_salary_max": Decimal("45000"),
            "benefits": "Free flights worldwide\nHealth insurance\nPension scheme\nTraining programs\nCareer progression",
            "training_programs": "Flight training\nCabin crew training\nLeadership development\nSafety training",
            "contact_hr": "careers@britishairways.com",
        },
        {
            "name": "Emirates",
            "iata_code": "EK",
            "icao_code": "UAE",
            "callsign": "Emirates",
            "country": "AE",
            "headquarters": "Dubai",
            "hub_airports": "DXB, DWC",
            "destinations": 157,
            "fleet_size": 271,
            "fleet_types": "Airbus A380, Boeing 777, Boeing 787",
            "founded_year": 1985,
            "website": "https://www.emirates.com",
            "is_hiring": True,
            "hiring_regions": "AE,IN,PK,PH,ZA,AU,NZ,GB,US",
            "pilot_requirements": "ATPL, 4000+ hours\nType rating preferred\nICAO Level 4 English\nClass 1 Medical\nWillingness to relocate to Dubai",
            "pilot_salary_min": Decimal("95000"),
            "pilot_salary_max": Decimal("220000"),
            "cabin_crew_requirements": "Minimum 21 years old\nArm reach of 212cm\nHigh school certificate\nFluent English + additional language preferred",
            "cabin_crew_salary_min": Decimal("35000"),
            "cabin_crew_salary_max": Decimal("55000"),
            "benefits": "Tax-free salary\nFree accommodation in Dubai\nFree flights\nMedical insurance\nAnnual leave tickets",
            "training_programs": "7-week cabin crew training\nPilot conversion training\nRecurrent training programs",
            "contact_hr": "careers@emirates.com",
        },
        {
            "name": "American Airlines",
            "iata_code": "AA",
            "icao_code": "AAL",
            "callsign": "American",
            "country": "US",
            "headquarters": "Fort Worth, Texas",
            "hub_airports": "DFW, CLT, PHX, PHL, MIA, JFK, LAX, ORD, DCA",
            "destinations": 350,
            "fleet_size": 956,
            "fleet_types": "Boeing 737, Boeing 777, Boeing 787, Airbus A319, Airbus A320, Airbus A321, Airbus A330",
            "founded_year": 1930,
            "website": "https://www.aa.com",
            "is_hiring": True,
            "hiring_regions": "US",
            "pilot_requirements": "ATP Certificate\n1500+ flight hours\nFirst Class Medical Certificate\nValid US Passport\nAuthorization to work in US",
            "pilot_salary_min": Decimal("90000"),
            "pilot_salary_max": Decimal("350000"),
            "cabin_crew_requirements": "High school diploma\nCustomer service experience\nAbility to reach overhead bins\nFlexible schedule availability",
            "cabin_crew_salary_min": Decimal("35000"),
            "cabin_crew_salary_max": Decimal("65000"),
            "benefits": "Flight benefits\n401k retirement plan\nHealth insurance\nPaid time off\nCareer development",
            "training_programs": "Flight attendant training\nPilot training programs\nLeadership development\nSafety training",
            "contact_hr": "careers@aa.com",
        },
        {
            "name": "Lufthansa",
            "iata_code": "LH",
            "icao_code": "DLH",
            "callsign": "Lufthansa",
            "country": "DE",
            "headquarters": "Cologne, Frankfurt",
            "hub_airports": "FRA, MUC",
            "destinations": 220,
            "fleet_size": 342,
            "fleet_types": "Airbus A320, Airbus A330, Airbus A340, Airbus A350, Airbus A380, Boeing 747",
            "founded_year": 1953,
            "website": "https://www.lufthansa.com",
            "is_hiring": True,
            "hiring_regions": "DE,AT,CH,EU",
            "pilot_requirements": "ATPL license\n1500+ hours experience\nICAO Level 4 English\nClass 1 Medical\nEU citizenship or work permit",
            "pilot_salary_min": Decimal("75000"),
            "pilot_salary_max": Decimal("200000"),
            "cabin_crew_requirements": "Professional training certificate\nLanguage skills (German + English)\nCustomer service experience\nTeam player",
            "cabin_crew_salary_min": Decimal("30000"),
            "cabin_crew_salary_max": Decimal("50000"),
            "benefits": "Staff travel benefits\nPension plan\nHealth insurance\nTraining opportunities\nFlexible working",
            "training_programs": "Comprehensive flight training\nCabin crew certification\nLanguage training\nSafety procedures",
            "contact_hr": "karriere@lufthansa.com",
        },
        {
            "name": "Qatar Airways",
            "iata_code": "QR",
            "icao_code": "QTR",
            "callsign": "Qatari",
            "country": "QA",
            "headquarters": "Doha",
            "hub_airports": "DOH",
            "destinations": 170,
            "fleet_size": 256,
            "fleet_types": "Airbus A320, Airbus A330, Airbus A350, Airbus A380, Boeing 737, Boeing 777, Boeing 787",
            "founded_year": 1993,
            "website": "https://www.qatarairways.com",
            "is_hiring": True,
            "hiring_regions": "QA,IN,PH,NP,LK,BD,PK,EG,JO,LB",
            "pilot_requirements": "ATPL with ICAO standards\n3000+ hours total time\nType rating on modern aircraft\nICAO Level 4 English proficiency",
            "pilot_salary_min": Decimal("88000"),
            "pilot_salary_max": Decimal("200000"),
            "cabin_crew_requirements": "Minimum 21 years old\nArm reach 212cm on tip toes\nHigh school education\nNo visible tattoos or piercings",
            "cabin_crew_salary_min": Decimal("32000"),
            "cabin_crew_salary_max": Decimal("48000"),
            "benefits": "Tax-free salary\nFree shared accommodation\nAnnual leave tickets\nMedical insurance\nTransportation",
            "training_programs": "7-week cabin crew training in Doha\nPilot type rating courses\nRecurrent training\nSafety training",
            "contact_hr": "recruitment@qatarairways.com.qa",
        },
        {
            "name": "Singapore Airlines",
            "iata_code": "SQ",
            "icao_code": "SIA",
            "callsign": "Singapore",
            "country": "SG",
            "headquarters": "Singapore",
            "hub_airports": "SIN",
            "destinations": 138,
            "fleet_size": 221,
            "fleet_types": "Airbus A330, Airbus A350, Airbus A380, Boeing 737, Boeing 777, Boeing 787",
            "founded_year": 1972,
            "website": "https://www.singaporeair.com",
            "is_hiring": False,
            "hiring_regions": "SG,MY,ID,TH,IN,AU,NZ",
            "pilot_requirements": "ATPL license\n2500+ hours command experience\nICAO Level 4 English\nType rating on modern aircraft",
            "pilot_salary_min": Decimal("120000"),
            "pilot_salary_max": Decimal("280000"),
            "cabin_crew_requirements": "Singapore Inflight Supervisor Certificate\nMinimum 158cm height\nSwimming proficiency\nCustomer service skills",
            "cabin_crew_salary_min": Decimal("40000"),
            "cabin_crew_salary_max": Decimal("65000"),
            "benefits": "Staff travel privileges\nMedical benefits\nPerformance bonuses\nCareer advancement\nTraining opportunities",
            "training_programs": "15-week cabin crew training\nPilot conversion programs\nService excellence training\nSafety training",
            "contact_hr": "careers@singaporeair.com.sg",
        },
    ]

    for airline_data in airlines_data:
        airline, created = Airline.objects.get_or_create(
            iata_code=airline_data["iata_code"], defaults=airline_data
        )
        if created:
            print(f"Created airline: {airline.name}")
        else:
            print(f"Airline already exists: {airline.name}")


def create_sample_reviews():
    # Get some airlines to add reviews to
    airlines = Airline.objects.all()[:3]  # First 3 airlines

    reviews_data = [
        {
            "airline": airlines[0],  # British Airways
            "position": "PILOT",
            "title": "Great career opportunities",
            "content": "Excellent training programs and good work-life balance. The routes are diverse and the aircraft are well-maintained. Management is generally supportive.",
            "overall_rating": 4,
            "work_life_balance": 4,
            "compensation": 4,
            "management": 3,
            "career_growth": 5,
            "years_experience": 8,
            "employment_status": "CURRENT",
        },
        {
            "airline": airlines[0],  # British Airways
            "position": "CABIN_CREW",
            "title": "Good company culture",
            "content": "Friendly colleagues and good training. The travel benefits are amazing. Sometimes the workload can be heavy during peak seasons.",
            "overall_rating": 4,
            "work_life_balance": 3,
            "compensation": 3,
            "management": 4,
            "career_growth": 4,
            "years_experience": 3,
            "employment_status": "CURRENT",
        },
        {
            "airline": airlines[1],  # Emirates
            "position": "PILOT",
            "title": "Excellent benefits package",
            "content": "Tax-free salary and accommodation provided. Flying the latest aircraft is exciting. Dubai is a great base. Long flights can be tiring.",
            "overall_rating": 5,
            "work_life_balance": 3,
            "compensation": 5,
            "management": 4,
            "career_growth": 4,
            "years_experience": 12,
            "employment_status": "CURRENT",
        },
        {
            "airline": airlines[2],  # American Airlines
            "position": "PILOT",
            "title": "Large airline with many opportunities",
            "content": "Good career progression and extensive route network. The merger processes have been challenging but things are improving.",
            "overall_rating": 3,
            "work_life_balance": 3,
            "compensation": 4,
            "management": 3,
            "career_growth": 4,
            "years_experience": 15,
            "employment_status": "FORMER",
        },
    ]

    for review_data in reviews_data:
        review = AirlineReview.objects.create(**review_data)
        print(f"Created review for {review.airline.name}")


if __name__ == "__main__":
    print("Creating sample airlines...")
    create_sample_airlines()

    print("\nCreating sample reviews...")
    create_sample_reviews()

    print("\nSample data creation complete!")
    print(f"Total airlines: {Airline.objects.count()}")
    print(f"Total reviews: {AirlineReview.objects.count()}")
