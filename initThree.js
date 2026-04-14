function updateAirFlow(tx, ty) {
    const pos = particles.geometry.attributes.position.array;
    const vels = particles.geometry.attributes.velocity.array;
    const s = acUnit.scale.x; // Одоогийн хэмжээ

    for (let i = 0; i < 2000; i++) {
        let idx = i * 3;
        pos[idx] += vels[idx];
        pos[idx+1] += vels[idx+1];
        pos[idx+2] += vels[idx+2];

        // Бөөмс дуусаад буцаж АС-ын байрлал дээр очих
        if (pos[idx+1] < -5 + acUnit.position.y) {
            pos[idx] = acUnit.position.x + (Math.random() - 0.5) * (3.5 * s);
            pos[idx+1] = acUnit.position.y - (0.4 * s);
            pos[idx+2] = acUnit.position.z;
        }
    }
    particles.geometry.attributes.position.needsUpdate = true;
}
const loader = new THREE.GLTFLoader();

// 'path/to/your/model.gltf' гэсэн хэсэгт өөрийн моделийн хаягийг бичнэ
loader.load('model.gltf', function (gltf) {
    const model = gltf.scene;
    
    // Моделийн хэмжээг тааруулах (хэт том эсвэл жижиг байвал энд өөрчилнө)
    model.scale.set(1, 1, 1); 
    
    // Моделийг төвд нь байрлуулах
    model.position.set(0, 0, 0);
    
    // acUnit группт моделийг нэмэх (ингэснээр гар дагаж хөдөлнө)
    acUnit.add(model);
});