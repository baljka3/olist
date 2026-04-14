function onResults(results) {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const lm = results.multiHandLandmarks[0];
        const linePos = [];
        const points = [];

        // 1. Цэгүүдийг Vector3 болгож авах (Энэ нь тооцоололд хэрэгтэй)
        for (let i = 0; i < 21; i++) {
            const x = (lm[i].x - 0.5) * -12;
            const y = (lm[i].y - 0.5) * -10;
            const z = -lm[i].z * 10;
            points.push(new THREE.Vector3(x, y, z));
        }

        // 2. БАЙРШИЛ (Алганы төв цэг 9)
        acUnit.position.lerp(new THREE.Vector3(points[9].x, points[9].y + 2, points[9].z), 0.1);

        // 3. ЭРГЭЛТ (Rotation) - Хамгийн найдвартай арга
        // Алганы суурь (0), Долоовор (5), Чигчий (17) цэгүүдээр хавтгай тодорхойлно
        const vA = new THREE.Vector3().subVectors(points[5], points[0]);
        const vB = new THREE.Vector3().subVectors(points[17], points[0]);
        
        // Гарын алганы чиглэлийг заах вектор
        const normal = new THREE.Vector3().crossVectors(vA, vB).normalize();
        
        // АС-ыг тухайн вектор руу харуулах
        const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            new THREE.Vector3(0, 1, 0), // Эхлэх босоо чиглэл
            normal
        );
        acUnit.quaternion.slerp(targetQuaternion, 0.1); // Зөөлөн эргүүлнэ

        // 4. ХЭМЖЭЭ (Scale)
        const dist = points[4].distanceTo(points[8]);
        let s = Math.max(0.5, Math.min(dist * 0.7, 2.5));
        acUnit.scale.set(s, s, s);

        // 5. ГАРЫН ШУГАМ ЗУРАХ
        const flatCoords = [];
        points.forEach(p => flatCoords.push(p.x, p.y, p.z));
        HAND_CONNECTIONS.forEach(([s, e]) => {
            linePos.push(flatCoords[s*3], flatCoords[s*3+1], flatCoords[s*3+2], 
                         flatCoords[e*3], flatCoords[e*3+1], flatCoords[e*3+2]);
        });
        handLines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePos, 3));

        updateAir();
    }
}