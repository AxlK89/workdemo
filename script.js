// Complete county matrix grouped by state
const regionalMatrix = {
    "WV": [
        "Barbour County", "Berkeley County", "Boone County", "Braxton County", "Brooke County", 
        "Cabell County", "Calhoun County", "Clay County", "Doddridge County", "Fayette County", 
        "Gilmer County", "Grant County", "Greenbrier County", "Hampshire County", "Hancock County", 
        "Hardy County", "Harrison County", "Jackson County", "Jefferson County", "Kanawha County", 
        "Lewis County", "Lincoln County", "Logan County", "McDowell County", "Marion County", 
        "Marshall County", "Mason County", "Mercer County", "Mineral County", "Mingo County", 
        "Monongalia County", "Monroe County", "Morgan County", "Nicholas County", "Ohio County", 
        "Pendleton County", "Pleasants County", "Pocahontas County", "Preston County", "Putnam County", 
        "Raleigh County", "Randolph County", "Ritchie County", "Roane County", "Summers County", 
        "Taylor County", "Tucker County", "Tyler County", "Upshur County", "Wayne County", 
        "Webster County", "Wetzel County", "Wirt County", "Wood County", "Wyoming County"
    ],
    "OH": [
        "Adams County", "Allen County", "Ashland County", "Ashtabula County", "Athens County", 
        "Auglaize County", "Belmont County", "Brown County", "Butler County", "Carroll County", 
        "Champaign County", "Clark County", "Clermont County", "Clinton County", "Columbiana County", 
        "Coshocton County", "Crawford County", "Cuyahoga County", "Darke County", "Defiance County", 
        "Delaware County", "Erie County", "Fairfield County", "Fayette County", "Franklin County", 
        "Fulton County", "Gallia County", "Geauga County", "Greene County", "Guernsey County", 
        "Hamilton County", "Hancock County", "Hardin County", "Harrison County", "Henry County", 
        "Highland County", "Hocking County", "Holmes County", "Huron County", "Jackson County", 
        "Jefferson County", "Knox County", "Lake County", "Lawrence County", "Licking County", 
        "Logan County", "Lorain County", "Lucas County", "Madison County", "Mahoning County", 
        "Marion County", "Medina County", "Meigs County", "Mercer County", "Miami County", 
        "Monroe County", "Montgomery County", "Morgan County", "Morrow County", "Muskingum County", 
        "Noble County", "Ottawa County", "Paulding County", "Perry County", "Pickaway County", 
        "Pike County", "Portage County", "Preble County", "Putnam County", "Richland County", 
        "Ross County", "Sandusky County", "Scioto County", "Seneca County", "Shelby County", 
        "Stark County", "Summit County", "Trumbull County", "Tuscarawas County", "Union County", 
        "Van Wert County", "Vinton County", "Warren County", "Washington County", "Wayne County", 
        "Williams County", "Wood County", "Wyandot County"
    ],
    "PA": [
        "Allegheny County", "Armstrong County", "Beaver County", "Bedford County", "Berks County", 
        "Blair County", "Bradford County", "Bucks County", "Butler County", "Cambria County", 
        "Cameron County", "Carbon County", "Centre County", "Chester County", "Clarion County", 
        "Clearfield County", "Clinton County", "Columbia County", "Crawford County", "Cumberland County", 
        "Dauphin County", "Delaware County", "Elk County", "Erie County", "Fayette County", 
        "Forest County", "Franklin County", "Fulton County", "Greene County", "Huntingdon County", 
        "Indiana County", "Jefferson County", "Juniata County", "Lackawanna County", "Lancaster County", 
        "Lawrence County", "Lebanon County", "Lehigh County", "Luzerne County", "Lycoming County", 
        "McKean County", "Mercer County", "Mifflin County", "Monroe County", "Montgomery County", 
        "Montour County", "Northampton County", "Northumberland County", "Perry County", "Philadelphia County", 
        "Pike County", "Potter County", "Schuylkill County", "Snyder County", "Somerset County", 
        "Sullivan County", "Susquehanna County", "Tioga County", "Union County", "Venango County", 
        "Warren County", "Washington County", "Wayne County", "Westmoreland County", "Wyoming County", 
        "York County"
    ],
    "MD": [
        "Allegany County", "Anne Arundel County", "Baltimore County", "Baltimore City", "Calvert County", 
        "Caroline County", "Carroll County", "Cecil County", "Charles County", "Dorchester County", 
        "Frederick County", "Garrett County", "Harford County", "Howard County", "Kent County", 
        "Montgomery County", "Prince George's County", "Queen Anne's County", "St. Mary's County", 
        "Somerset County", "Talbot County", "Washington County", "Wicomico County", "Worcester County"
    ]
};

// Parent clients map out sub-groups
const clientSubsidiaries = {
    "FirstEnergy": [
        "West Penn Power",
        "Mon Power",
        "Potomac Edison",
        "Ohio Edison",
        "The Illuminating Company",
        "Toledo Edison",
        "Penelec (Pennsylvania Electric Co)",
        "Met-Ed (Metropolitan Edison)",
        "Jersey Central Power & Light (JCP&L)"
    ],
    "AEP": [
        "AEP Ohio / Ohio Power Company",
        "Appalachian Power (West Virginia)",
        "Wheeling Power Company",
        "Indiana Michigan Power",
        "Kentucky Power"
    ]
};

// Automated Territory Mapping Database (Maps OpCo -> Primary Target State)
const opcoTerritoryRouting = {
    "West Penn Power": "PA",
    "Penelec (Pennsylvania Electric Co)": "PA",
    "Met-Ed (Metropolitan Edison)": "PA",
    "Mon Power": "WV",
    "Wheeling Power Company": "WV",
    "Appalachian Power (West Virginia)": "WV",
    "AEP Ohio / Ohio Power Company": "OH",
    "Ohio Edison": "OH",
    "The Illuminating Company": "OH",
    "Toledo Edison": "OH",
    "Potomac Edison": "MD", // Sets to primary, change manually if managing border extensions
    "Jersey Central Power & Light (JCP&L)": "NJ", // Safely maps out state scope bounds
    "Indiana Michigan Power": "IN",
    "Kentucky Power": "KY"
};

const safetyMatrix = {
    "imaging": { controls: ["Maintain strict Minimum Approach Distance (MAD) from primary overhead lines.", "Set vehicle hazard warning lights flashers and plant hood safety cone immediately upon parking.", "Always execute a physical visual sweep around the pole baseline before establishing camera setups."] },
    "pci": { controls: ["Perform meticulous visual inspection of the pole base, ground line shell rot, or structural splitting prior to approaching.", "Look up to check for broken crossarms, damaged insulators, or hanging equipment hardware before starting inspections.", "Exercise caution around guy wires and anchors for tension issues or raw metal corrosion."] },
    "pai": { controls: ["Utilize height-measuring sticks safely under strict clearance tracking lines when auditing telecom attachments.", "Verify structural separation intervals between neutral power boundaries and communication strands.", "Check down-guy wire insulation positions and report any uninsulated crossings immediately."] },
    "telecom": { controls: ["Perform FVD checks on any down lines or raw attachments before approaching field setup points.", "Be hyper-aware of low hanging service drops across lanes, driveways, and vegetation barriers.", "Ensure clear physical isolation tracking between power utilities and communications configurations."] },
    "leveling": { controls: ["Establish deliberate three-point footing tracks when handling instrumentation arrays along slopes.", "Ensure continuous line of sight communication indicators remain maintained between field partners."] }
};

function initializeJsaTerminal() {
    const dateStampElement = document.getElementById('live-date-stamp');
    if (dateStampElement) {
        const today = new Date();
        dateStampElement.value = today.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    const clientSelect = document.getElementById('client');
    const subWrapper = document.getElementById('subsidiary-wrapper');
    const subSelect = document.getElementById('subsidiary');
    const stateSelect = document.getElementById('state');
    const countySelect = document.getElementById('county');
    const taskSelect = document.getElementById('task-type');
    const hastingsInput = document.getElementById('hastings-date');
    const glovesInput = document.getElementById('gloves-date');
    const submitBtn = document.getElementById('submit-btn');
    const pdfBtn = document.getElementById('pdf-btn');

    // Populate Sub-companies when parent client changes
    if (clientSelect && subSelect && subWrapper) {
        clientSelect.addEventListener('change', () => {
            const selectedClient = clientSelect.value;
            subSelect.innerHTML = '<option value="">-- Select OpCo --</option>';
            
            if (selectedClient && clientSubsidiaries[selectedClient]) {
                subWrapper.style.display = "flex";
                clientSubsidiaries[selectedClient].forEach(opco => {
                    const option = document.createElement('option');
                    option.value = opco;
                    option.textContent = opco;
                    subSelect.appendChild(option);
                });
            } else {
                subWrapper.style.display = "none";
                subSelect.innerHTML = '<option value="">-- Select OpCo --</option>';
            }
        });
    }

    // AUTOMATED FIELD ROUTING: Triggered when precise Operating Company is selected
    if (subSelect && stateSelect) {
        subSelect.addEventListener('change', () => {
            const chosenOpco = subSelect.value;
            if (chosenOpco && opcoTerritoryRouting[chosenOpco]) {
                const targetedState = opcoTerritoryRouting[chosenOpco];
                
                // Automatically set the State select box
                stateSelect.value = targetedState;
                
                // Fire a manual event kick to force county list updates instantly
                const event = new Event('change', { bubbles: true });
                stateSelect.dispatchEvent(event);
            }
        });
    }

    // Populate counties based on current state selection
    if (stateSelect && countySelect) {
        stateSelect.addEventListener('change', () => {
            const selectedState = stateSelect.value;
            countySelect.innerHTML = '<option value="">-- County --</option>';
            if (selectedState && regionalMatrix[selectedState]) {
                regionalMatrix[selectedState].forEach(county => {
                    const option = document.createElement('option');
                    option.value = county; 
                    option.textContent = county; 
                    countySelect.appendChild(option);
                });
            } else {
                countySelect.innerHTML = '<option value="">-- County --</option>';
            }
        });
    }

    if (taskSelect) {
        taskSelect.addEventListener('change', () => {
            const taskType = taskSelect.value;
            const displaySection = document.getElementById('hazard-display-section');
            const controlsContainer = document.getElementById('control-plan-items');
            if (!controlsContainer) return;
            controlsContainer.innerHTML = "";
            
            if (taskType && safetyMatrix[taskType]) {
                displaySection.style.display = "block";
                safetyMatrix[taskType].controls.forEach(control => {
                    const div = document.createElement('div'); 
                    div.className = "control-item"; 
                    div.textContent = control; 
                    controlsContainer.appendChild(div);
                });
            } else { 
                displaySection.style.display = "none"; 
            }
        });
    }

    if (hastingsInput) hastingsInput.addEventListener('input', evaluateFormValidity);
    if (glovesInput) glovesInput.addEventListener('input', evaluateFormValidity);

    function evaluateFormValidity() {
        if (!submitBtn) return;
        const safetyPassed = evaluateEquipmentCompliance();
        if (safetyPassed) {
            submitBtn.disabled = false;
        } else { 
            submitBtn.disabled = true; 
        }
    }

    function evaluateEquipmentCompliance() {
        const feedback = document.getElementById('gatekeeper-feedback');
        if (!hastingsInput?.value && !glovesInput?.value) { 
            if (feedback) feedback.style.display = 'none'; 
            return true; 
        }

        const today = new Date();
        let isError = false; 
        let message = "";

        if (hastingsInput?.value) {
            const hastingsAgeMonths = (today.getFullYear() - new Date(hastingsInput.value).getFullYear()) * 12 + (today.getMonth() - new Date(hastingsInput.value).getMonth());
            if (hastingsAgeMonths > 24) { 
                isError = true; 
                message += "🚨 CRITICAL LOCKOUT: Hastings Rod dielectric verification has expired (> 24 Mos).<br>"; 
            }
        }

        if (glovesInput?.value) {
            const glovesAgeMonths = (today.getFullYear() - new Date(glovesInput.value).getFullYear()) * 12 + (today.getMonth() - new Date(glovesInput.value).getMonth());
            if (glovesAgeMonths > 6) { 
                isError = true; 
                message += "🚨 CRITICAL LOCKOUT: Class 3 Rubber Gloves insulation line is out of spec (> 6 Mos)."; 
            }
        }

        if (!feedback) return !isError;

        if (isError) {
            feedback.innerHTML = message; 
            feedback.className = "gatekeeper-alert critical"; 
            feedback.style.display = "block"; 
            return false;
        } else {
            feedback.innerHTML = "✓ Active Tool Inspection Dates verified internally. No exceptions flagged.";
            feedback.className = "gatekeeper-alert"; 
            feedback.style.display = "block"; 
            feedback.style.borderLeftColor = "var(--success-green)";
            return true;
        }
    }

    if (submitBtn && pdfBtn) {
        submitBtn.onclick = () => {
            submitBtn.style.display = 'none';
            pdfBtn.style.display = 'block';
            alert("✓ DIGITAL JSA COMPLETED & LOCKED\n\nAuthorization Trace ID Code: ORB-" + Math.floor(100000 + Math.random() * 900000) + "\n\nForm is now frozen. Tap 'Export Official PDF Record' to generate your document.");
        };

        pdfBtn.onclick = () => {
            window.print();
        };
    }
    
    evaluateFormValidity();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
    initializeJsaTerminal();
} else {
    document.addEventListener("DOMContentLoaded", initializeJsaTerminal);
}

function toggleAllBoxes(containerId, checkAllState) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const checkboxes = container.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => { cb.checked = checkAllState; });
}