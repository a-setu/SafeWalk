// Safety Companion Module Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the map
    const map = L.map('safety-map').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add sample crime data
    const crimeData = [
        { lat: 51.505, lng: -0.09, type: 'theft', severity: 2 },
        { lat: 51.51, lng: -0.1, type: 'harassment', severity: 3 },
        { lat: 51.515, lng: -0.095, type: 'assault', severity: 4 }
    ];

    crimeData.forEach(crime => {
        const color = crime.severity > 3 ? 'red' : crime.severity > 2 ? 'orange' : 'yellow';
        L.circleMarker([crime.lat, crime.lng], {
            radius: 8,
            fillColor: color,
            color: '#000',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        }).addTo(map).bindPopup(`<b>${crime.type}</b><br>Severity: ${crime.severity}/5`);
    });

    // Route finding functionality
    document.getElementById('find-route').addEventListener('click', function() {
        const destination = document.getElementById('destination-input').value;
        if (!destination) {
            alert('Please enter a destination');
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLat = position.coords.latitude;
                const userLng = position.coords.longitude;
                
                // In a real app, this would calculate a safe route
                alert(`Finding safest route from your location (${userLat}, ${userLng}) to ${destination}`);
                
                // Sample route (would be replaced with actual routing logic)
                const route = L.polyline([
                    [userLat, userLng],
                    [51.51, -0.1],
                    [51.515, -0.095]
                ], {color: 'blue'}).addTo(map);
                
                // Zoom to show the route
                map.fitBounds(route.getBounds());
                
                // Update companion ETA if active
                if (document.getElementById('start-companion').disabled === false) {
                    document.getElementById('companion-eta').textContent = 'ETA: ~25 min';
                    document.querySelector('.companion-timer').classList.remove('hidden');
                }
            });
        } else {
            alert("Geolocation is not supported by your browser");
        }
    });

    // Location sharing toggle
    const shareToggle = document.getElementById('share-toggle');
    shareToggle.addEventListener('change', function() {
        const statusText = document.getElementById('share-status-text');
        const shareWith = document.getElementById('share-with').value;
        
        if (this.checked && shareWith) {
            if (navigator.geolocation) {
                statusText.textContent = 'Sharing with ' + 
                    document.getElementById('share-with').options[document.getElementById('share-with').selectedIndex].text;
                statusText.style.color = 'green';
                
                // In a real app, this would start sharing location with the selected contact
                console.log('Location sharing started with', shareWith);
            } else {
                this.checked = false;
                alert("Geolocation is not supported by your browser");
            }
        } else {
            statusText.textContent = 'Not sharing';
            statusText.style.color = 'red';
            console.log('Location sharing stopped');
        }
    });

    // "I'm Home" button
    document.getElementById('im-home-btn').addEventListener('click', function() {
        if (shareToggle.checked) {
            alert("Your contacts have been notified that you're home safely");
            shareToggle.checked = false;
            document.getElementById('share-status-text').textContent = 'Not sharing';
            document.getElementById('share-status-text').style.color = 'red';
        } else {
            alert("Location sharing is not currently active");
        }
    });

    // Emergency SOS button
    const sosButton = document.getElementById('sos-button');
    let sosHoldTimer;
    
    sosButton.addEventListener('mousedown', function() {
        sosHoldTimer = setTimeout(() => {
            triggerEmergency();
        }, 2000); // Require 2 second hold
    });
    
    sosButton.addEventListener('mouseup', function() {
        clearTimeout(sosHoldTimer);
    });
    
    sosButton.addEventListener('mouseleave', function() {
        clearTimeout(sosHoldTimer);
    });
    
    function triggerEmergency() {
        if (confirm("Are you sure you want to send an emergency alert?")) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(position => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // In a real app, this would notify emergency contacts
                    alert(`EMERGENCY ALERT SENT!\nYour location: ${lat}, ${lng}\nContacts notified.`);
                    
                    // Flash the button to confirm
                    sosButton.style.backgroundColor = '#ff0000';
                    setTimeout(() => {
                        sosButton.style.backgroundColor = '#ff3860';
                    }, 500);
                });
            } else {
                alert("Geolocation is not supported by your browser");
            }
        }
    }

    // Voice activation
    let recognition;
    document.getElementById('voice-toggle').addEventListener('click', function() {
        if (!recognition) {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript.toLowerCase();
                if (transcript.includes('help me')) {
                    triggerEmergency();
                }
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                this.textContent = 'Enable Voice Control';
                recognition = null;
            };
            
            recognition.start();
            this.textContent = 'Listening... Say "HELP ME"';
            this.innerHTML = '<i class="fas fa-microphone-slash"></i> Stop Listening';
            
            recognition.onend = () => {
                this.textContent = 'Enable Voice Control';
                this.innerHTML = '<i class="fas fa-microphone"></i> Enable Voice Control';
                recognition = null;
            };
        } else {
            recognition.stop();
        }
    });

    // Quick actions
    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            switch(action) {
                case 'fake-call':
                    // Simulate incoming call
                    alert("Incoming call: Mom\nPretend to answer and talk to someone safe.");
                    break;
                case 'flashlight':
                    // Toggle screen brightness
                    document.body.style.backgroundColor = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
                    document.body.style.color = document.body.style.backgroundColor === 'black' ? 'white' : 'black';
                    break;
                case 'alarm':
                    // Play loud sound (in real app would use Audio API)
                    alert("LOUD ALARM SOUND PLAYING!\nThis would play an 85dB siren in the real app.");
                    break;
                case 'record':
                    // Start recording (simulated)
                    alert("Recording started (30 seconds)\nThis would record audio in the real app.");
                    setTimeout(() => {
                        alert("Recording saved");
                    }, 30000);
                    break;
            }
        });
    });

    // Companion mode
    const companionSelect = document.getElementById('companion-select');
    const startCompanionBtn = document.getElementById('start-companion');
    
    companionSelect.addEventListener('change', function() {
        startCompanionBtn.disabled = !this.value;
    });
    
    startCompanionBtn.addEventListener('click', function() {
        const companionName = companionSelect.options[companionSelect.selectedIndex].text;
        const statusDiv = document.getElementById('companion-status');
        
        statusDiv.innerHTML = `
            <span>Status: Active with ${companionName}</span>
            <div class="companion-timer">
                <i class="fas fa-clock"></i>
                <span id="companion-eta">ETA: --:--</span>
            </div>
        `;
        
        document.getElementById('companion-alerts').classList.remove('hidden');
        
        // In a real app, this would start sharing trip details with companion
        console.log('Companion mode started with', companionName);
        
        // Simulate companion alerts
        setTimeout(() => {
            const alertList = document.getElementById('alert-list');
            const alertItem = document.createElement('li');
            alertItem.innerHTML = '<i class="fas fa-exclamation-circle"></i> Your companion has been notified your trip has started';
            alertList.appendChild(alertItem);
        }, 2000);
    });

    // User reports
    document.getElementById('report-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('report-type').value;
        const details = document.getElementById('report-details').value;
        const anonymous = document.getElementById('anonymous-report').checked;
        
        if (!type) {
            alert('Please select an incident type');
            return;
        }
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                
                // In a real app, this would send to your backend
                alert(`Report submitted for ${type} at your location. ${anonymous ? 'Submitted anonymously.' : ''}`);
                this.reset();
                
                // Add marker to map
                const marker = L.marker([lat, lng], {
                    icon: L.divIcon({
                        className: 'report-marker',
                        html: '<i class="fas fa-exclamation-triangle"></i>',
                        iconSize: [30, 30]
                    })
                }).addTo(map);
                
                let popupContent = `<b>${type}</b>`;
                if (details) popupContent += `<br>${details}`;
                if (!anonymous) popupContent += `<br><i>Reported by user</i>`;
                
                marker.bindPopup(popupContent);
                
                // Zoom to show the marker if it's far from current view
                if (!map.getBounds().contains(marker.getLatLng())) {
                    map.setView(marker.getLatLng(), 15);
                }
            }, () => {
                alert("Couldn't get your location for the report");
            });
        } else {
            alert("Geolocation is not supported by your browser");
        }
    });
});