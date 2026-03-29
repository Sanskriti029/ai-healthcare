def seed_extra_data(db, Hospital, Doctor, Pharmacy):
    # We just run one giant seed if DB is empty
    if Hospital.query.count() > 0:
        return

    hospitals = [
        # Original 20 Bhopal Hospitals
        Hospital(name="AIIMS Bhopal", address="AIIMS Campus Rd, AIIMS Campus, Saket Nagar, Habib Ganj, Bhopal, Madhya Pradesh 462020", city="Bhopal", phone="0755-298260"),
        Hospital(name="Hamidia Hospital", address="Sultania Rd, Royal Market, Bhopal, Madhya Pradesh 462001", city="Bhopal", phone="0755-4050450"),
        Hospital(name="Bhopal Memorial (BMHRC)", address="Bhopal ByPass, Raisen Road, Karond, Bhopalnd", city="Bhopal", phone="0755-2742212"),
        Hospital(name="JP District Hospital", address="Shivaji Nagar, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="0755-255681"),
        Hospital(name="Kasturba Hospital", address=" Kasturba Market, BHEL, N-2, Habib Ganj, Bhopal, Madhya Pradesh 462024", city="Bhopal", phone="0755-2505336"),
        Hospital(name="Apollo Sage Hospital", address="Bawadiya Kalan, Salaiya, Bhopal, Madhya Pradesh 462026", city="Bhopal", phone="0755-4308101"),
        Hospital(name="Sagar Multispeciality", address="SMH, Narmadapuram Rd, near Shri Ram Colony, Shri Ram Colony, Bhopal, Madhya Pradesh 462047", city="Bhopal", phone="0755-2465024"),
        Hospital(name="Bansal Hospital", address="Chuna Bhatti Rd, Manisha Market, Sector C, Shahpura, Bhopal, Madhya Pradesh 462039", city="Bhopal", phone="0755-4086000"),
        Hospital(name="Chirayu Health", address="Bhainsakhedi, Near Bairagarh, Bhopal-Indore Highway, Bhopal, Madhya Pradesh, 462030.ra", city="Bhopal", phone="0755-2737403"),
        Hospital(name="LBS Hospital", address="73, Motia Talab Rd, opp. Motia Lake, Kohefiza, Kali Basti, Peer Gate Area, Bhopal, Madhya Pradesh 462001", city="Bhopal", phone="0755-2541151"),
        Hospital(name="Galaxy Hospital", address="25, near Jain Mandir, Banjari, Danish Kunj, Kolar Rd, Bhopal, Madhya Pradesh 462042", city="Bhopal", phone="9589666300"),
        Hospital(name="Lakecity Hospital", address=" B 27, Near, Chetak Bridge, Sector B, Kasturba Nagar, Bhopal, Madhya Pradesh 462011", city="Bhopal", phone="0755-2551151"),
        Hospital(name="Nilay Hospital", address="74-C Bagsewania, Main Rd, Narmadapuram Rd, Sector C, Vidya Nagar, Bhopal, Madhya Pradesh 462026", city="Bhopal", phone="9424054193"),
        Hospital(name="Rainbow Children Hospital", address="27, Bhadbhada Rd, North TT Nagar, TT Nagar, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="0755-2779006"),
        Hospital(name="Silver Line Hospital", address="Kohefiza, Kali Basti, Peer Gate Area, Bhopal, Madhya Pradesh 462001", city="Bhopal", phone="0755-2505336"),
        Hospital(name="Aashirwad Women Hospital", address="10, Jain Mandir Badbagh Shahjahanabad Bhopal, MP, 462001", city="Bhopal", phone="0755-2660233"),
        Hospital(name="Hajela Hospital", address="Geetanjali Complex, near Mata Mandir Square, Kotra Sultanabad, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="0755-2773392"),
        Hospital(name="Metrocity Multispeciality", address="PC-21, Padmanabhan Nagar, Near Prabhat Square, Ashoka Garden, Bhopal-462023, Madhya Pradesh", city="Bhopal", phone="0755-3511234"),
        Hospital(name="Miracles Hospital", address="Hoshangabad Road Near Ashima Mall, 200 feet road, Bhopal, Madhya Pradesh 462043", city="Bhopal", phone="0755-4004960"),
        Hospital(name="Siddhanta Red Cross", address="Link Rd 1, Shivaji Nagar, Bhopal, Madhya Pradesh 462011", city="Bhopal", phone="0755-2572555"),
        Hospital(name="Narmada Trauma Centre", address="Link Rd 1, Shivaji Nagar, Bhopal, Madhya Pradesh 462011", city="Bhopal", phone="0755-4040000"),
        Hospital(name="National Hospital", address="Habibganj Rd, Opp Cricket Club, E-3, Arera Colony, Bhopal, Madhya Pradesh 462016", city="Bhopal", phone="0755-2428500"),
        Hospital(name="Navodaya Hospital", address="Navodaya Cancer Hospital, Nizamuddin Rd, Opp BHEL Gate, Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh, 462022", city="Bhopal", phone="0755-2462222"),
        Hospital(name="Parul Hospital", address="HIG 2, Ankur Colony, Shivaji Nagar, Bhopal, Madhya Pradesh 462016", city="Bhopal", phone="0755-2575555"),
        Hospital(name="Suyash Hospital", address="Janki Nagar, Chuna Bhatti, Bhopal, Madhya Pradesh 462016", city="Bhopal", phone="0755-4222000"),
        Hospital(name="Hope Hospital", address="1, Ayodhya Bypass Rd, Mohan Nagar, Prakash Nagar, Mamta Nagar, Bhopal, Madhya Pradesh 462022", city="Bhopal", phone="0755-2508888"),
        Hospital(name="Noble Multispeciality", address="269/1, near Capital Mall, Misrod, Bhopal, Madhya Pradesh 462026", city="Bhopal", phone="0755-2566666"),
        Hospital(name="Care CHL", address="Ab Road, Near LIG Sq, RSS Nagar, Indore, New Market, Bhopal-462003, Madhya Pradesh", city="Bhopal", phone="0755-4009999"),
        Hospital(name="RKDF Medical College Hospital", address="5F98+HVH, Hoshangabad Road, NH-12, Behind Vrindavan Garden, Jatkhedi, Bhopal, Madhya Pradesh 462047", city="Bhopal", phone="0755-3334444"),
        Hospital(name="JK Hospital", address=" Sector C, Near Bhima Kunj, Sarvadharam, Kolar Road, Bhopal-462042, Madhya Pradesh", city="Bhopal", phone="0755-3000555"),
        Hospital(name="Peoples Hospital", address="Bhanpur, Bhopal (M.P.) 462037", city="Bhopal", phone="0755-4005000"),
        Hospital(name="LNCT Hospital", address="Kolar Rd, Sarvadharam C Sector, Shirdipuram, Sarvadharam, Bhopal, Madhya Pradesh 462042", city="Bhopal", phone="0755-2875000"),
        Hospital(name="Anant Shree Hospital", address="MIG 37 OLD MLA QUARTERS, Jawahar Chowk, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="0755-4229999"),
        Hospital(name="Comfort Multispeciality", address="SRR Arcade, Kaggadasapura Main Rd, Abbaiah Reddy Layout, C.V. Raman Nagar, Kaggadasapura, Bengaluru, Karnataka 560093", city="Bhopal", phone="0755-2111111"),
        Hospital(name="Akshay Hospital", address="11, Main Rd No. 3, opposite Ekant Park, Rishi Nagar, Mannipuram, Char Imli, Bhopal, Madhya Pradesh 462016", city="Bhopal", phone="0755-2511111"),
        Hospital(name="Navjeevan Hospital", address="652, Katara Hills Rd, Arvind Vihar, Bagmugaliya, Bhopal, Madhya Pradesh 462043", city="Bhopal", phone="0755-2666666"),
        Hospital(name="Chirayu Medical College Hospital", address="Bhopal Byp, Bhainsakhedi, Bairagarh, Bhopal, Madhya Pradesh 462030", city="Bhopal", phone="0755-2666111"),
        Hospital(name="City Hospital & Research Center", address="Plot No 115, Near State Bank, Behind Pragati Petrol Pump, Zone II, Link Road, M P Nagar, Bhopal-462011, Madhya Pradesh", city="Bhopal", phone="0755-2555555"),
        Hospital(name="Vatsalya Hospital", address=" B-66, Chetak Bridge, Near Chetak Bridge, Chetak Bridge, Housing Board Colony, Kasturba Nagar, Bhopal, Madhya Pradesh 462011", city="Bhopal", phone="0755-2555511"),
        Hospital(name="Siddhanta Super Specialty", address="Link Rd 1, Shivaji Nagar, Bhopal, Madhya Pradesh 462011", city="Bhopal", phone="0755-4200000"),
        Hospital(name="Shreya Hospital", address="Indrapuri", city="Bhopal", phone="0755-2600000"),
        Hospital(name="Pushpanjali Hospital", address="Zone 13 Ward, 52, Aakriti Eco City Rd, Rohit Nagar, Bawadiya Kalan, Salaiya, Bhopal, Madhya Pradesh 462039", city="Bhopal", phone="0755-4000001"),
        Hospital(name="CIMS Hospital", address="Kalibadi Rd, A-Sector, Sector A, Habib Ganj, Bhopal, Madhya Pradesh 462023", city="Bhopal", phone="0755-4000002"),
        Hospital(name="Relief Hospital", address="Nariyal Kgheda Squae, Near Military Area, Nariyal Kheda, Bhopal-462038, Madhya Pradesh", city="Bhopal", phone="0755-4000003"),
        Hospital(name="Bairagarh Civil Hospital", address="78HM+GGV, Pooja Shree Nagar, Bairagarh, Bhopal, Madhya Pradesh 462031", city="Bhopal", phone="0755-4000004"),
        Hospital(name="Mittal Hospital", address="78HJ+QW8, Bairagarh, Bhopal, Madhya Pradesh 462031", city="Bhopal", phone="0755-4000005"),
        Hospital(name="Shakuntala Hospital", address="F-113/49, Ekta Parisar, Shivaji Nagar, Bhopal", city="Bhopal", phone="0755-4000006"),
        Hospital(name="Samarpan Hospital", address=" 5CQQ+3G7, Anamika Nagar, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony, Bhopal, Madhya Pradesh 462039", city="Bhopal", phone="0755-4000007"),
        Hospital(name="Arogya Hospital", address="Ward No.-01, Sargo Tower, Deep Nagar Rd, near Pratham Dhaba, behind Bajrang WareHouse, Mahaveer Nagar, Mandideep, Bhopal, Madhya Pradesh 462046", city="Bhopal", phone="0755-4000008"),

        # Indore Hospitals
        # Hospital(name="Bombay Hospital", address="Ring Road", city="Indore", phone="0731-2551111"),
        # Hospital(name="Medanta Super Specialty", address="Vijay Nagar", city="Indore", phone="0731-4747474"),
        # Hospital(name="CHL Hospital", address="AB Road", city="Indore", phone="0731-4774444"),
        # Hospital(name="Choithram Hospital", address="Manik Bagh Road", city="Indore", phone="0731-2362491"),
        # Hospital(name="Apollo Rajshree", address="Vijay Nagar", city="Indore", phone="0731-4040404"),
        # Hospital(name="Vishesh Jupiter", address="Ring Road", city="Indore", phone="0731-4242424"),
        # Hospital(name="SAIMS", address="Sanwer Road", city="Indore", phone="0731-4231000"),
        # Hospital(name="Synergy Hospital", address="Vijay Nagar", city="Indore", phone="0731-4011111"),
        # Hospital(name="Verma Union Hospital", address="AB Road", city="Indore", phone="0731-2555555"),
        # Hospital(name="Apple Hospital", address="Bhawarkua", city="Indore", phone="0731-4022222"),
        # Hospital(name="DNS Hospital", address="AB Road", city="Indore", phone="0731-4033333"),
        # Hospital(name="Greater Kailash Hospital", address="Old Palasia", city="Indore", phone="0731-4044444"),
        # Hospital(name="Shalby Hospital", address="Race Course Road", city="Indore", phone="0731-4055555"),
        # Hospital(name="Reliance Hospital", address="Geeta Bhawan", city="Indore", phone="0731-4066666"),
        # Hospital(name="Eureka Hospital", address="South Tukoganj", city="Indore", phone="0731-4077777"),

        # Jabalpur Hospitals
        # Hospital(name="Marble City Hospital", address="Wright Town", city="Jabalpur", phone="0761-2404040"),
        # Hospital(name="Aditya Super Multispecialty", address="Napier Town", city="Jabalpur", phone="0761-2414141"),
        # Hospital(name="Shalby Hospital", address="Vijay Nagar", city="Jabalpur", phone="0761-2424242"),
        # Hospital(name="Swastik Multispeciality", address="Wright Town", city="Jabalpur", phone="0761-2434343"),
        # Hospital(name="City Hospital", address="Civic Center", city="Jabalpur", phone="0761-2444444"),
        # Hospital(name="Jamdar Hospital", address="Gol Bazar", city="Jabalpur", phone="0761-2454545"),
        # Hospital(name="Jabalpur Hospital", address="Russell Chowk", city="Jabalpur", phone="0761-2464646"),
        # Hospital(name="Sethia Hospital", address="Wright Town", city="Jabalpur", phone="0761-2474747"),

        # Gwalior Hospitals
        # Hospital(name="Sahara Hospital", address="City Center", city="Gwalior", phone="0751-2444000"),
        # Hospital(name="BIMR Hospitals", address="Residency", city="Gwalior", phone="0751-2455555"),
        # Hospital(name="ITM Hospital", address="NH-75", city="Gwalior", phone="0751-2466666"),
        # Hospital(name="Ratan Jyoti Netralaya", address="Lashkar", city="Gwalior", phone="0751-2477777"),
        # Hospital(name="RJN Apollo Spectra", address="Gwalior", city="Gwalior", phone="0751-2488888"),
        # Hospital(name="Kalyan Memorial", address="Morar", city="Gwalior", phone="0751-2499999"),
        # Hospital(name="GD Hospital", address="Thatipur", city="Gwalior", phone="0751-2500000"),

        # Ujjain Hospitals
        # Hospital(name="CHL Ujjain", address="Freeganj", city="Ujjain", phone="0734-2555555"),
        # Hospital(name="Patidar Hospital", address="Dewas Road", city="Ujjain", phone="0734-2566666"),
        # Hospital(name="Tejankar Hospital", address="Rishi Nagar", city="Ujjain", phone="0734-2577777"),
        # Hospital(name="Deshmukh Hospital", address="Freeganj", city="Ujjain", phone="0734-2588888"),
        # Hospital(name="Charitable Hospital", address="Nanakheda", city="Ujjain", phone="0734-2599999"),
        
        # Other MP Cities
        # Hospital(name="Chirayu Hospital", address="Civil Lines", city="Rewa", phone="07662-250000"),
        # Hospital(name="Vindhya Hospital", address="Sirmour Chowk", city="Rewa", phone="07662-251111"),
        # Hospital(name="Bansal Health Center", address="City Center", city="Sagar", phone="07582-252222"),
        # Hospital(name="Sagar Multispecialty", address="Makronia", city="Sagar", phone="07582-253333"),
        # Hospital(name="Birla Hospital", address="Satna", city="Satna", phone="07672-254444"),
        # Hospital(name="Ratlam District Hospital", address="Station Road", city="Ratlam", phone="07412-255555"),
        # Hospital(name="Khandwa Medical Center", address="Civil Lines", city="Khandwa", phone="0733-256666")
    ]

    doctors = [
        # Original 20 Bhopal Doctors
       # Doctor(name="Dr. Prabhakar Tiwari", specialization="CMHO", experience=10, hospital_name="Bhopal Division", city="Bhopal", phone="9827554923"),
        Doctor(name="Dr. Arvind Joshi", specialization="Urology", experience=10, hospital_name="Sagar Multispeciality", city="Bhopal", phone="0755-2465024"),
        Doctor(name="Dr. Sapna Bajaj Jain", specialization="Gynaecology", experience=10, hospital_name="Sagar Multispeciality", city="Bhopal", phone="0755-4004960"),
        Doctor(name="Dr. Shailendra Dube", specialization="Internal Medicine", experience=10, hospital_name="Apollo Sage", city="Bhopal", phone="0755-4308101"),
        Doctor(name="Dr. Nirendra Kumar Rai", specialization="Neurology", experience=10, hospital_name="Apollo Sage", city="Bhopal", phone="0755-4308111"),
       # Doctor(name="Dr. Sonal Chouksey", specialization="Infertility", experience=10, hospital_name="Birla Fertility", city="Bhopal", phone="0755-2742121"),
       # Doctor(name="Dr. Manish Borasi", specialization="Psychiatry", experience=10, hospital_name="Serenity Clinic", city="Bhopal", phone="9826163178"),
        Doctor(name="Dr. Nilay Singh Rajput", specialization="General Physician", experience=10, hospital_name="Nilay Hospital", city="Bhopal", phone="9827054193"),
        Doctor(name="Dr. Anand Jayant Kale", specialization="Plastic Surgery", experience=10, hospital_name="Lakecity Hospital", city="Bhopal", phone="9425004150"),
        Doctor(name="Dr. S. K. Gupta", specialization="Orthopedics", experience=10, hospital_name="Galaxy Hospital", city="Bhopal", phone="9425117710"),
        Doctor(name="Dr. Ritu Singhal", specialization="Pathology", experience=10, hospital_name="Sagar Multispeciality", city="Bhopal", phone="0755-2465025"),
        Doctor(name="Dr. Mahendra Jain", specialization="Paediatrics", experience=10, hospital_name="Sagar Multispeciality", city="Bhopal", phone="0755-3505050"),
        Doctor(name="Dr. Akhilesh Agarwal", specialization="Dermatology", experience=10, hospital_name="Apollo Sage", city="Bhopal", phone="0755-4308101"),
        Doctor(name="Dr. Gaurav Khandelwal", specialization="Cardiology", experience=10, hospital_name="Apollo Sage", city="Bhopal", phone="0755-4308111"),
        Doctor(name="Dr. Rahul Jain", specialization="Neurosurgery", experience=10, hospital_name="Apollo Sage", city="Bhopal", phone="0755-4308101"),
        # Doctor(name="Dr. Roopsingh", specialization="MD Medicine", experience=10, hospital_name="Private Clinic", city="Bhopal", phone="9497276818"),
        # Doctor(name="Dr. Rutul Goklani", specialization="Health Foundation", experience=10, hospital_name="Arera Colony", city="Bhopal", phone="9826441299"),
        # Doctor(name="Dr. Ragini", specialization="Rheumatology", experience=10, hospital_name="Private Clinic", city="Bhopal", phone="9300497615"),
        # Doctor(name="Dr. Zehra Tayiba", specialization="General Medicine", experience=10, hospital_name="Salamah Hospital", city="Bhopal", phone="9425647289"),
        # Doctor(name="Dr. Asif", specialization="Homeopathy", experience=10, hospital_name="Private Clinic", city="Bhopal", phone="9425377487"),

        # 30+ More Bhopal Doctors
        Doctor(name="Dr. Sanjeev Gupta", specialization="Cardiology", experience=15, hospital_name="Narmada Trauma Centre", city="Bhopal", phone="9988776655"),
        Doctor(name="Dr. Rajesh Sharma", specialization="Neurology", experience=12, hospital_name="Citi Hospital", city="Bhopal", phone="9988776654"),
        Doctor(name="Dr. Atul Jain", specialization="Orthopedics", experience=20, hospital_name="National Hospital", city="Bhopal", phone="9988776653"),
        Doctor(name="Dr. Ravi Khare", specialization="General Physician", experience=8, hospital_name="Navodaya Hospital", city="Bhopal", phone="9988776652"),
        Doctor(name="Dr. Jyoti Tiwari", specialization="Gynaecology", experience=14, hospital_name="Parul Hospital", city="Bhopal", phone="9988776651"),
        Doctor(name="Dr. Ajay Mishra", specialization="Paediatrics", experience=11, hospital_name="Suyash Hospital", city="Bhopal", phone="9988776650"),
        #Doctor(name="Dr. Sandeep Agarwal", specialization="Surgery", experience=18, hospital_name="LNM Hospital", city="Bhopal", phone="9988776649"),
        Doctor(name="Dr. Deepak Maravi", specialization="Internal Medicine", experience=10, hospital_name="Hope Hospital", city="Bhopal", phone="9988776648"),
        Doctor(name="Dr. Vikram Singh", specialization="Dermatology", experience=9, hospital_name="Noble Multispeciality", city="Bhopal", phone="9988776647"),
        Doctor(name="Dr. Rakesh Chaurasia", specialization="Physician", experience=16, hospital_name="Care CHL", city="Bhopal", phone="9988776646"),
        Doctor(name="Dr. Sumit Narang", specialization="Ophthalmology", experience=12, hospital_name="RKDF Medical College", city="Bhopal", phone="9988776645"),
        Doctor(name="Dr. Anju Jain", specialization="Dentistry", experience=14, hospital_name="JK Hospital", city="Bhopal", phone="9988776644"),
        Doctor(name="Dr. Vikas Agrawal", specialization="Psychiatry", experience=20, hospital_name="Peoples Hospital", city="Bhopal", phone="9988776643"),
        Doctor(name="Dr. Pankaj Verma", specialization="Cardiology", experience=17, hospital_name="LNCT Hospital", city="Bhopal", phone="9988776642"),
        Doctor(name="Dr. Meenakshi Dubey", specialization="Gynaecology", experience=13, hospital_name="Anant Shree Hospital", city="Bhopal", phone="9988776641"),
        Doctor(name="Dr. Kapil Sharma", specialization="Urology", experience=11, hospital_name="Comfort Multispeciality", city="Bhopal", phone="9988776640"),
        Doctor(name="Dr. Sameer Khan", specialization="Physician", experience=9, hospital_name="Akshay Hospital", city="Bhopal", phone="9988776639"),
        Doctor(name="Dr. Ritesh Shukla", specialization="Oncology", experience=19, hospital_name="Navjeevan Hospital", city="Bhopal", phone="9988776638"),
        Doctor(name="Dr. Abhinav Singh", specialization="Nephrology", experience=15, hospital_name="Chirayu Medical College", city="Bhopal", phone="9988776637"),
        Doctor(name="Dr. Kirti Deshpande", specialization="Rheumatology", experience=10, hospital_name="City Hospital", city="Bhopal", phone="9988776636"),
        Doctor(name="Dr. Amit Gupta", specialization="Physician", experience=18, hospital_name="Vatsalya Hospital", city="Bhopal", phone="9988776635"),
        Doctor(name="Dr. Prateek Sharma", specialization="Surgery", experience=14, hospital_name="Siddhanta", city="Bhopal", phone="9988776634"),
        Doctor(name="Dr. Vinit Shah", specialization="Neurology", experience=16, hospital_name="Shreya Hospital", city="Bhopal", phone="9988776633"),
        Doctor(name="Dr. Sanjay Pande", specialization="Orthopedics", experience=22, hospital_name="Pushpanjali Hospital", city="Bhopal", phone="9988776632"),
        Doctor(name="Dr. Ranu Tiwari", specialization="Paediatrics", experience=7, hospital_name="CIMS", city="Bhopal", phone="9988776631"),
        Doctor(name="Dr. Alok Kumar", specialization="General Physician", experience=12, hospital_name="Relief Hospital", city="Bhopal", phone="9988776630"),
        Doctor(name="Dr. Priya Singh", specialization="Dermatology", experience=11, hospital_name="Bairagarh Civil", city="Bhopal", phone="9988776629"),
        Doctor(name="Dr. Rohan Saxena", specialization="Surgery", experience=15, hospital_name="Mittal Hospital", city="Bhopal", phone="9988776628"),
        Doctor(name="Dr. Sunita Patil", specialization="Gynaecology", experience=10, hospital_name="Shakuntala Hospital", city="Bhopal", phone="9988776627"),
        Doctor(name="Dr. Ramesh Bhargava", specialization="Physician", experience=25, hospital_name="Samarpan Hospital", city="Bhopal", phone="9988776626"),

        # Chirayu Hospital Specific Doctors
        Doctor(name="Dr. Ashish Goyal", specialization="Cardiology", experience=15, hospital_name="Chirayu Medical College Hospital", city="Bhopal", phone="9988112233"),
        Doctor(name="Dr. Smita Pathak", specialization="Gynaecology", experience=12, hospital_name="Chirayu Medical College Hospital", city="Bhopal", phone="9988112234"),
        Doctor(name="Dr. Rakesh Singh", specialization="Orthopedics", experience=20, hospital_name="Chirayu Medical College Hospital", city="Bhopal", phone="9988112235"),
        Doctor(name="Dr. Manish Chourasia", specialization="Neurology", experience=14, hospital_name="Chirayu Medical College Hospital", city="Bhopal", phone="9988112236"),
        Doctor(name="Dr. Priya Tiwari", specialization="Paediatrics", experience=10, hospital_name="Chirayu Medical College Hospital", city="Bhopal", phone="9988112237"),

        # Indore Doctors
        # Doctor(name="Dr. Manish Jain", specialization="Cardiology", experience=20, hospital_name="Bombay Hospital", city="Indore", phone="9988665544"),
        # Doctor(name="Dr. Amit Bhat", specialization="Neurology", experience=15, hospital_name="Medanta", city="Indore", phone="9988665543"),
        # Doctor(name="Dr. Neeraj Sharma", specialization="Orthopedics", experience=18, hospital_name="CHL Hospital", city="Indore", phone="9988665542"),
        # Doctor(name="Dr. Ritu Agrawal", specialization="Gynaecology", experience=12, hospital_name="Choithram Hospital", city="Indore", phone="9988665541"),
        # Doctor(name="Dr. Sandeep Sinha", specialization="Paediatrics", experience=14, hospital_name="Apollo Rajshree", city="Indore", phone="9988665540"),
        # Doctor(name="Dr. Pranav Pandey", specialization="Surgery", experience=22, hospital_name="Vishesh Jupiter", city="Indore", phone="9988665539"),
        # Doctor(name="Dr. Vivek Sharma", specialization="Nephrology", experience=16, hospital_name="SAIMS", city="Indore", phone="9988665538"),
        # Doctor(name="Dr. Anup Tiwari", specialization="Surgeon", experience=19, hospital_name="Synergy Hospital", city="Indore", phone="9988665537"),
        # Doctor(name="Dr. Reena Jain", specialization="Dermatology", experience=11, hospital_name="Apple Hospital", city="Indore", phone="9988665536"),
        # Doctor(name="Dr. Sameer Gupta", specialization="Internal Medicine", experience=13, hospital_name="DNS Hospital", city="Indore", phone="9988665535"),
        # Doctor(name="Dr. Vikas Soni", specialization="Psychiatry", experience=10, hospital_name="Greater Kailash", city="Indore", phone="9988665534"),
        # Doctor(name="Dr. Rohan Joshi", specialization="Physician", experience=14, hospital_name="Shalby Hospital", city="Indore", phone="9988665533"),
        # Doctor(name="Dr. Akash Dubey", specialization="Urology", experience=17, hospital_name="Reliance Hospital", city="Indore", phone="9988665532"),
        # Doctor(name="Dr. Shruti Verma", specialization="Neurology", experience=15, hospital_name="Eureka Hospital", city="Indore", phone="9988665531"),

        # Jabalpur Doctors
        # Doctor(name="Dr. Anil Jain", specialization="Cardiology", experience=18, hospital_name="Marble City Hospital", city="Jabalpur", phone="9977665544"),
        # Doctor(name="Dr. Pradeep Sharma", specialization="Neurology", experience=14, hospital_name="Aditya Super Multispecialty", city="Jabalpur", phone="9977665543"),
        # Doctor(name="Dr. Ramesh Singh", specialization="Orthopedics", experience=20, hospital_name="Shalby Hospital", city="Jabalpur", phone="9977665542"),
        # Doctor(name="Dr. Suman Tiwari", specialization="Gynaecology", experience=12, hospital_name="Swastik Multispeciality", city="Jabalpur", phone="9977665541"),
        # Doctor(name="Dr. Vivek Dubey", specialization="Paediatrics", experience=16, hospital_name="City Hospital", city="Jabalpur", phone="9977665540"),

        # Gwalior Doctors
        # Doctor(name="Dr. Manoj Gupta", specialization="Cardiology", experience=21, hospital_name="Sahara Hospital", city="Gwalior", phone="9966554433"),
        # Doctor(name="Dr. Ashish Chauhan", specialization="Orthopedics", experience=17, hospital_name="BIMR Hospitals", city="Gwalior", phone="9966554432"),
        # Doctor(name="Dr. Divya Singh", specialization="Gynaecology", experience=13, hospital_name="ITM Hospital", city="Gwalior", phone="9966554431"),
        # Doctor(name="Dr. Sanjay Tiwari", specialization="Paediatrics", experience=15, hospital_name="Ratan Jyoti Netralaya", city="Gwalior", phone="9966554430"),
        # Doctor(name="Dr. Rohit Agarwal", specialization="Neurology", experience=19, hospital_name="Kalyan Memorial", city="Gwalior", phone="9966554429"),

        # Ujjain Doctors
        # Doctor(name="Dr. Sudhir Sharma", specialization="General Physician", experience=22, hospital_name="CHL Ujjain", city="Ujjain", phone="9955443322"),
        # Doctor(name="Dr. Anupam Jain", specialization="Orthopedics", experience=18, hospital_name="Patidar Hospital", city="Ujjain", phone="9955443321"),
        # Doctor(name="Dr. Meera Deshpande", specialization="Gynaecology", experience=14, hospital_name="Tejankar Hospital", city="Ujjain", phone="9955443320"),
        # Doctor(name="Dr. Vishal Patel", specialization="Paediatrics", experience=16, hospital_name="Deshmukh Hospital", city="Ujjain", phone="9955443319"),
        
        # Other MP Doctors
        # Doctor(name="Dr. Rajesh Patel", specialization="Cardiology", experience=15, hospital_name="Chirayu Hospital", city="Rewa", phone="9944332211"),
        # Doctor(name="Dr. Anil Dixit", specialization="Orthopedics", experience=18, hospital_name="Bansal Health Center", city="Sagar", phone="9944332212"),
        # Doctor(name="Dr. Pooja Sharma", specialization="Gynaecology", experience=12, hospital_name="Birla Hospital", city="Satna", phone="9944332213"),
        # Doctor(name="Dr. Arun Malviya", specialization="Neurology", experience=20, hospital_name="Ratlam District Hospital", city="Ratlam", phone="9944332214")
    ]

    pharmacies = [
        # Original 20 Bhopal Pharmacies
        Pharmacy(name="Sadana Medical Store", address="310/2-A NO. 3, opposite AIIMS GATE, Saket Nagar, Bhopal, Madhya Pradesh 462024", city="Bhopal", phone="9152232483", open_24hrs=True),
        Pharmacy(name="Moolchand Medical Stores", address="Shop No: 3 Plot, No: 2, New Market Main Rd, New Market, STT Nagar, TT Nagar, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="755-4223752", open_24hrs=True),
        Pharmacy(name="Apollo Pharmacy", address="Shop No.1, Ground Floor, near Madhuram Palace Hotel, C Sector, Nehru Nagar, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="0755-4308101", open_24hrs=True),
        Pharmacy(name="Verma Medical Store", address="Shop No 3, Near, Opposite Santoshi Mata Mandir Square, Naveen Nagar, Bhopal-462010, Madhya Pradesh", city="Bhopal", phone="9098506916", open_24hrs=False),
        Pharmacy(name="Palak Medical Store", address=" Madan Market, 8, opp. Govt. Primary Health Center, Madan Market, Misrod, Bhopal, Madhya Pradesh 462047", city="Bhopal", phone="9827017797", open_24hrs=True),
        Pharmacy(name="Tejas Medical", address="G-55, Vardhaman City Plaza, Near Nadara Bus Stand, Dawa Bazar, Hamidia Road, Bhopal-462001, Madhya Pradesh", city="Bhopal", phone="9981147247", open_24hrs=True),
        Pharmacy(name="Sadan Shah Medical", address="Prince Tower, 3, Old Thana Rd, Naveen Nagar, Bhopal, Madhya Pradesh 462010", city="Bhopal", phone="9522228786", open_24hrs=True),
        Pharmacy(name="Jai Maa Narmade", address="24, Samm Hospital, Near Ashoka Garden Police Station and Famous Hotel, 80 Feet Road, Main Road, Ashoka Garden, Bhopal-462023, Madhya Pradesh", city="Bhopal", phone="9229998880", open_24hrs=False),
        Pharmacy(name="Yadav Chemist", address="6C3W+6C9, Narmadapuram Rd, Narayan Market, Near State Bank ATM, Narayan Nagar, Bhopal, Madhya Pradesh 462026", city="Bhopal", phone="755-4223752", open_24hrs=False),
        Pharmacy(name="Guru Medical Stores", address="Shop G 13, Gulmohar, Door Sanchar Colony, Shahpura, Bhopal, Madhya Pradesh 462039", city="Bhopal", phone="9713198600", open_24hrs=True),
        Pharmacy(name="Shree Balaji Medical", address=" 04, Nerala Road, Chatrapati Nagar, Near Naman Sweet and Indian Petrol Pump, Ayodhya Nagar, Bhopal-462041, Madhya Pradesh", city="Bhopal", phone="9893406569", open_24hrs=False),
        Pharmacy(name="Khandelwal Medical", address="Main market, durga chowk, Vidya Nagar, Mandideep, Bhopal, Madhya Pradesh 462046", city="Bhopal", phone="9425023836", open_24hrs=False),
        Pharmacy(name="Chaturvedi Medical", address="8, Plot No 49-51, Panjab National Bank, Main Street, Trilanga, Bhopal-462039, Madhya Pradesh", city="Bhopal", phone="9039338512", open_24hrs=False),
        Pharmacy(name="Dameera Pharmacy", address="18, Bansal Vihar Colony, Rohit Nagar, Bawadiya Kalan, Gulmohar Colony, Bhopal, Madhya Pradesh 462039", city="Bhopal", phone="9926551307", open_24hrs=True),
        Pharmacy(name="Shiva Medical", address="10, Near 12 No Bus Stop, Main Road, Arera Colony, Bhopal-462016, Madhya Pradesh", city="Bhopal", phone="9131794847", open_24hrs=True),
        Pharmacy(name="B K Gupta Medical", address="Shop No 47, Near JP Hospital, 1250, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="755-2970008", open_24hrs=False),
        Pharmacy(name="We Care Pharma", address="Shop No - G 40, Surendra Manik Complex, Awadhpuri, Bhopal, Madhya Pradesh 462022", city="Bhopal", phone="9827668531", open_24hrs=True),
        Pharmacy(name="New Shriji Medicos", address="Shop no. 2, S-80, Main road, Near Sai Mandir, C Sector, Nehru Nagar, Bhopal, Madhya Pradesh 462003", city="Bhopal", phone="8989661166", open_24hrs=False),
        Pharmacy(name="H R Pharmacy", address="2, 11 Mill, Near By Parmar Aata Chakki, In Front Of Wine Shop, Misord, Bhopal-462047, Madhya Pradesh", city="Bhopal", phone="9425020293", open_24hrs=False),
        Pharmacy(name="Siddhant Medical Store", address="KotraltaKalKheda, Opposite Mathura Dairy, Kotra Sultanabad, Kamla Nagar, Bhopal-462003, Madhya Pradeshnabad", city="Bhopal", phone="9893129418", open_24hrs=False),

        # 30+ More Bhopal Pharmacies
        Pharmacy(name="Sanjeevani Medical", address="Zone I, M P Nagar, Bhopal-462011, Madhya Pradesh", city="Bhopal", phone="9111222333", open_24hrs=True),
        Pharmacy(name="Relief Medicos", address="9, Jain Tower, Police Line, Nehru Nagar, Bhopal - 462003", city="Bhopal", phone="9111222334", open_24hrs=False),
        Pharmacy(name="Apex Pharmacy", address="Apex Hospital Building No. 116, 117, Sindhi Colony Square, Berasia Road, Bhopal-462001, Madhya Pradesh", city="Bhopal", phone="9111222335", open_24hrs=True),
        Pharmacy(name="HealthPlus Pharmacy", address="A-15, Mandakini Colony, Tathastu Dental Clinic, Kolar Road, Bhopal-462042, Madhya Pradesh", city="Bhopal", phone="9111222336", open_24hrs=True),
        Pharmacy(name="Narmada Medical Store", address="E3/23 Arora Colony, Arera Colony, Bhopal-462016, Madhya Pradesh", city="Bhopal", phone="9111222337", open_24hrs=False),
        Pharmacy(name="JK Medical", address="Sector C, Near Bhima Kunj, Sarvadharam, Kolar Road, Bhopal-462042, Madhya Pradesh", city="Bhopal", phone="9111222338", open_24hrs=True),
        Pharmacy(name="Peoples Medical", address="04, Karond Bypass Rd, Peoples Campus, Bhanpur, Bhopal, Madhya Pradesh 462037", city="Bhopal", phone="9111222339", open_24hrs=True),
        Pharmacy(name="Navjeevan Medicos", address="652, Katara Hills Rd, Arvind Vihar, Bagmugaliya, Bhopal, Madhya Pradesh 462043", city="Bhopal", phone="9111222340", open_24hrs=False),
        Pharmacy(name="Care Pharmacy", address="Avinash Nagar, Adharshila East Block Extension, Bhopal-462022, Madhya Pradesh", city="Bhopal", phone="9111222341", open_24hrs=True),
        Pharmacy(name="Wellness Store", address="Bus Stop, near No.10, E-7, Shahpura, Bhopal, Madhya Pradesh 462016 ", city="Bhopal", phone="9111222342", open_24hrs=False),
        Pharmacy(name="Shri Ram Medical", address="No.18, Near Minal Residency Bhl Gate No 1, A Bhagat Singh Market, Indrapuri, Bhopal-462023, Madhya Pradesh", city="Bhopal", phone="9111222343", open_24hrs=True),
        Pharmacy(name="City Care Medical Store", address="77 in front of, 80, Taj-ul-Masjid Rd, Motia Talab, Kali Basti, Bhopal, Madhya Pradesh 462001", city="Bhopal", phone="9111222344", open_24hrs=False),
        Pharmacy(name="LifeLine Pharmacy", address=" A/498, B66, near Manisha Market, Varun Nagar, Sector B, Shahpura, Bhopal, Madhya Pradesh 462039", city="Bhopal", phone="9111222345", open_24hrs=True),
        Pharmacy(name="Hope Medicos", address="Nirmal Complex, Near Pratima Marriage Garden, Azad Nagar, Ayodhya Nagar, Bhopal-462041, Madhya Pradesh", city="Bhopal", phone="9111222346", open_24hrs=False),

        # Chirayu Hospital Specific Pharmacies
        Pharmacy(name="Chirayu Medical Store", address="Chirayu Campus, Bairagarh", city="Bhopal", phone="9122334455", open_24hrs=True),
        Pharmacy(name="Bairagarh Medicos", address="Bhopal Byp, Bhainsakhedi, Bairagarh, Bhopal, Madhya Pradesh 462030", city="Bhopal", phone="9122334456", open_24hrs=False),
        Pharmacy(name="Sanjivani Pharmacy", address="Main Road, Bairagarh", city="Bhopal", phone="9122334457", open_24hrs=True),
        Pharmacy(name="Shubham Medical", address="Pushpa Nagar Chauraha, Maha Mai Rd, near bharat petrol pump, Ka Bagh, Aish Bagh, Bhopal, Madhya Pradesh 462010", city="Bhopal", phone="9111222347", open_24hrs=True),
        Pharmacy(name="Krishna Pharmacy", address="Shop No 03, Krishna Complex, Ganpati Enclave, Near Bima Kunj Square, Colony Road, Kolar Road, Bhopal-462042, Madhya Pradesh", city="Bhopal", phone="9111222348", open_24hrs=False),
        Pharmacy(name="Vatsalya Medical Store", address="B-66, Chetak Bridge, Near Chetak Bridge, Chetak Bridge, Housing Board Colony, Kasturba Nagar, Bhopal, Madhya Pradesh 462011", city="Bhopal", phone="9111222349", open_24hrs=True),
        Pharmacy(name="Aarogya Pharmacy", address="Ward No.-01, Sargo Tower, Deep Nagar Rd, near Pratham Dhaba, behind Bajrang WareHouse, Mahaveer Nagar, Mandideep, Bhopal, Madhya Pradesh 462046", city="Bhopal", phone="9111222350", open_24hrs=False),
        Pharmacy(name="Kolar Health Store", address=" Ishika Tower, near Shiv Sweet, Mandakini Society, Shirdipuram, Kolar Rd, Gehun Kheda, Bhopal, Madhya Pradesh 462042", city="Bhopal", phone="9111222351", open_24hrs=True),
        Pharmacy(name="Awadhpuri Medical", address="7-A, near State Bank of India, A Sector, Awadhpuri, Bhopal, Madhya Pradesh 462022", city="Bhopal", phone="9111222352", open_24hrs=False),
        Pharmacy(name="Saket Pharmacy", address="SaketagShop No:9, BDA Complex, Sector- 9/A Saket Nagar, Habib Ganj, Bhopal, Madhya Pradesh 462024ar", city="Bhopal", phone="9111222353", open_24hrs=True),

        # Indore Pharmacies
        # Pharmacy(name="Apollo Pharmacy Geeta Bhawan", address="Geeta Bhawan", city="Indore", phone="9211222333", open_24hrs=True),
        # Pharmacy(name="Wellness Forever", address="Vijay Nagar", city="Indore", phone="9211222334", open_24hrs=True),
        # Pharmacy(name="Dawa Bazaar", address="Central Medical Hub", city="Indore", phone="9211222335", open_24hrs=False),
        # Pharmacy(name="MedPlus", address="Palasia", city="Indore", phone="9211222336", open_24hrs=True),
        # Pharmacy(name="Apple Medical", address="Bhawarkua", city="Indore", phone="9211222337", open_24hrs=False),
        # Pharmacy(name="SAIMS Pharmacy", address="Sanwer Road", city="Indore", phone="9211222338", open_24hrs=True),
        # Pharmacy(name="Medanta Store", address="Vijay Nagar", city="Indore", phone="9211222339", open_24hrs=True),
        # Pharmacy(name="CHL Pharmacy", address="AB Road", city="Indore", phone="9211222340", open_24hrs=True),
        # Pharmacy(name="City Medical", address="Bhawarkua", city="Indore", phone="9211222341", open_24hrs=False),
        # Pharmacy(name="Cure Pharmacy", address="Annapurna", city="Indore", phone="9211222342", open_24hrs=True),

        # Jabalpur Pharmacies
        # Pharmacy(name="Shalby Pharmacy", address="Vijay Nagar", city="Jabalpur", phone="9311222333", open_24hrs=True),
        # Pharmacy(name="Marble City Medicos", address="Wright Town", city="Jabalpur", phone="9311222334", open_24hrs=False),
        # Pharmacy(name="Life Pharmacy", address="Civic Center", city="Jabalpur", phone="9311222335", open_24hrs=True),
        # Pharmacy(name="Swastik Medicals", address="Wright Town", city="Jabalpur", phone="9311222336", open_24hrs=False),
        # Pharmacy(name="Arogya Kendra", address="Napier Town", city="Jabalpur", phone="9311222337", open_24hrs=True),

        # Gwalior Pharmacies
        # Pharmacy(name="BIMR Medical", address="Residency", city="Gwalior", phone="9411222333", open_24hrs=True),
        # Pharmacy(name="Sahara Store", address="City Center", city="Gwalior", phone="9411222334", open_24hrs=False),
        # Pharmacy(name="Gwalior Medical", address="Lashkar", city="Gwalior", phone="9411222335", open_24hrs=True),
        # Pharmacy(name="Katora Talab Pharmacy", address="Morar", city="Gwalior", phone="9411222336", open_24hrs=False),
        # Pharmacy(name="City Care Medicos", address="Thatipur", city="Gwalior", phone="9411222337", open_24hrs=True),

        # Ujjain Pharmacies
        # Pharmacy(name="Mahakal Medical", address="Near Temple", city="Ujjain", phone="9511222333", open_24hrs=True),
        # Pharmacy(name="CHL Pharmacy Ujjain", address="Freeganj", city="Ujjain", phone="9511222334", open_24hrs=False),
        # Pharmacy(name="Freeganj Medical Store", address="Freeganj", city="Ujjain", phone="9511222335", open_24hrs=True),
        # Pharmacy(name="Patidar Medicos", address="Dewas Road", city="Ujjain", phone="9511222336", open_24hrs=False),

        # Other MP Pharmacies
        # Pharmacy(name="Rewa Medical", address="Civil Lines", city="Rewa", phone="9611222333", open_24hrs=True),
        # Pharmacy(name="Sagar Health Store", address="Makronia", city="Sagar", phone="9611222334", open_24hrs=False),
        # Pharmacy(name="Satna Medicos", address="City Center", city="Satna", phone="9611222335", open_24hrs=True),
        # Pharmacy(name="Ratlam Remedy Store", address="Station Road", city="Ratlam", phone="9611222336", open_24hrs=False)
    ]

    db.session.add_all(hospitals)
    db.session.add_all(doctors)
    db.session.add_all(pharmacies)
    db.session.commit()
    print("Seeded extra data perfectly!")
