// --- ЭЙР КОНДИШН ГРУПП ---
const acUnit = new THREE.Group();

// Материалууд
const wireMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true, transparent: true, opacity: 0.1 });
const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffff });
const neonMat = new THREE.MeshBasicMaterial({ color: 0x00ffff });

// 1. Үндсэн их бие (Өргөн нь 3.5, Өндөр 0.8, Гүн нь ердөө 0.6)
// Хэрэв гүн (Z) нь хэт их байвал "онгоц" шиг харагдана.
const mainGeo = new THREE.BoxGeometry(3.5, 0.8, 0.6); 
const mainBody = new THREE.Mesh(mainGeo, wireMat);
acUnit.add(mainBody);
acUnit.add(new THREE.LineSegments(new THREE.EdgesGeometry(mainGeo), lineMat));

// 2. Урд талын нүүр (Front Panel)
const frontGeo = new THREE.BoxGeometry(3.5, 0.75, 0.05);
const frontPanel = new THREE.Mesh(frontGeo, wireMat);
frontPanel.position.set(0, 0, 0.3); // Урагш нь бага зэрэг түрсэн
acUnit.add(frontPanel);

// 3. Агаар гаргагч (Flap) - Энэ нь доор байх ёстой
const flapGeo = new THREE.BoxGeometry(3.3, 0.02, 0.2);
const flap = new THREE.Mesh(flapGeo, neonMat);
flap.position.set(0, -0.4, 0.2); // Доор байрлуулсан
acUnit.add(flap);

// 4. Хажуугийн хүрээ (Симметрик, маш нарийн)
const sideGeo = new THREE.BoxGeometry(0.05, 0.8, 0.6);
[-1.75, 1.75].forEach(x => {
    const side = new THREE.Mesh(sideGeo, neonMat);
    side.position.set(x, 0, 0);
    acUnit.add(side);
});

// 5. Дэлгэц (Температур харах хэсэг)
const screenGeo = new THREE.PlaneGeometry(0.2, 0.1);
const screen = new THREE.Mesh(screenGeo, neonMat);
screen.position.set(1.2, -0.1, 0.33); // Нүүрэн талын баруун доор
acUnit.add(screen);

scene.add(acUnit);

// ЧУХАЛ: Хэрэв эйр кондишн чинь хажуу тийшээ хараад байвал 
// дараах мөрийг ашиглаж зөв харуулна:
acUnit.rotation.set(0, 0, 0);