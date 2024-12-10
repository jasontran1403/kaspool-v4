import { OrbitControls, Environment } from '@react-three/drei';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer } from 'three';
import { useEffect, useState, useRef } from 'react';
import { FaYoutube, FaTelegram, FaSquareXTwitter } from "react-icons/fa6";
import gsap from 'gsap';
import beeModel from "../assets/model/pyramid_glass_full_new.glb";
import IMAGE from "../assets/model/night-9.jpg";
import TrustWalletConnect from "../components/TrustWalletConnect";
import { toast, ToastContainer } from 'react-toastify';
import * as THREE from 'three';
import { PerspectiveCamera } from "@react-three/drei";
import ModalSection1 from "../components/ModalSection1";
import ModalSection2 from "../components/ModalSection2";
import ModalSection3 from "../components/ModalSection3";
import ModalSection4 from "../components/ModalSection4";
import logo from "../landingpage-assets/img/resources/logo-white.png";
import { useLocation } from "react-router-dom";
import "../landingpage-assets/css/main.css";
import soundFile from "../assets/music/music.mp3"; // Đường dẫn file âm thanh

const coordinates = [
    { index: 0, name: "Default", rotation: { x: 0, y: 0, z: 0 }, content: "" },
    { index: 1, name: "What is Kaspool?", rotation: { x: -5, y: 15, z: 5 }, content: "" },
    { index: 2, name: "Features", rotation: { x: 5, y: 15, z: 5 }, content: "" },
    { index: 3, name: "BlockDAG Technology", rotation: { x: 10, y: -5, z: 5 }, content: "" },
    { index: 4, name: "TEAM", rotation: { x: 0, y: 30, z: 15 }, content: "" }
];

const Model = ({ rotation, actionIndex, onActionComplete, isRetrieve }) => {
    const gltf = useLoader(GLTFLoader, beeModel);
    const mixer = useRef(null);
    const modelRef = useRef();
    const { camera } = useThree();

    const resetCameraPosition = () => {
        gsap.to(camera.position, {
            x: 0,
            y: 35,
            z: 30,
            duration: 1, // Thời gian chuyển đổi (giây)
            ease: "power2.inOut", // Hiệu ứng easing
            onUpdate: () => camera.lookAt(0, 0, 0), // Cập nhật hướng nhìn trong quá trình di chuyển
        });
    };

    useEffect(() => {
        let timeoutId;
        let timeoutAction;

        if (gltf.animations && gltf.animations.length > 0) {
            mixer.current = new AnimationMixer(gltf.scene);
            mixer.current.stopAllAction();
            resetCameraPosition();
            if (actionIndex >= 1 && actionIndex <= 3) {
                const action = mixer.current.clipAction(gltf.animations[actionIndex - 1]);
                action.reset();

                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                if (actionIndex === 1) {
                    action.startAt(mixer.current.time - 7);
                    action.play();
                } else if (actionIndex === 2) {
                    action.startAt(mixer.current.time - 3);
                    action.play();
                } else if (actionIndex === 3) {
                    timeoutAction = setTimeout(() => {
                        action.play();
                    }, 600);
                }
            } else if (actionIndex == 4) {
                const action = mixer.current.clipAction(gltf.animations[3]);
                action.reset();

                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                action.startAt(mixer.current.time - 1);
                action.setDuration(3.6); // Chạy trong 2 giây
                action.play();


            } else if (actionIndex == 0 && isRetrieve) {
                const action = mixer.current.clipAction(gltf.animations[4]);
                action.reset();
                action.startAt(mixer.current.time - 2);

                action.setLoop(THREE.LoopOnce);
                action.clampWhenFinished = true;
                action.setDuration(3.6); // Chạy trong 2 giây

                action.play();
            }

            mixer.current.addEventListener("finished", () => {
                timeoutId = setTimeout(() => {
                    onActionComplete(actionIndex);
                }, 100);
            });
        }

        if (modelRef.current) {
            gsap.to(modelRef.current.position, {
                x: rotation.x,
                y: rotation.y,
                z: rotation.z,
                duration: 1.5,
                ease: "power2.inOut"
            });
        }

        // Góc quay cố định cho mỗi actionIndex
        let targetRotationY = modelRef.current.rotation.y;
        let targetRotationX = modelRef.current.rotation.y;

        if (actionIndex === 0) {
            targetRotationY = THREE.MathUtils.degToRad(0);
            targetRotationX = THREE.MathUtils.degToRad(0);
        } else if (actionIndex === 1) {
            targetRotationY = THREE.MathUtils.degToRad(400);
            targetRotationX = 0;
        } else if (actionIndex === 2) {
            targetRotationY = THREE.MathUtils.degToRad(90);
            targetRotationX = 0;
        } else if (actionIndex === 3) {
            targetRotationY = THREE.MathUtils.degToRad(200);
            targetRotationX = THREE.MathUtils.degToRad(-20);
        } else if (actionIndex === 4) {
            targetRotationY = THREE.MathUtils.degToRad(195);
            targetRotationX = THREE.MathUtils.degToRad(-4)
        }

        // Xoay về góc cố định thay vì cộng dồn vào góc hiện tại
        gsap.to(modelRef.current.rotation, {
            x: targetRotationX,
            y: targetRotationY,
            duration: 1.5,
            ease: "power2.inOut"
        });

        return () => {
            if (timeoutId || timeoutAction) {
                clearTimeout(timeoutId);
                clearTimeout(timeoutAction);
            }
        };
    }, [gltf, actionIndex]);

    useFrame((state, delta) => {
        mixer.current?.update(delta);
    });

    // Apply gsap rotation when rotation changes
    useEffect(() => {

    }, [actionIndex]);


    return <primitive object={gltf.scene} ref={modelRef} />;
};

const Pyramid = () => {
    const [corCount, setCorCount] = useState(0);
    const [currentCoordinate, setCurrentCoordinate] = useState(coordinates[0]);
    const [activeModal, setActiveModal] = useState(null); // Trạng thái lưu modal đang mở
    const [isRotate, setRotate] = useState(true);
    const [isDisable, setDisable] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [isRetrieve, setRetrieve] = useState(false);
    const [defaultCamera] = useState({ x: 0, y: 35, z: 30 });
    let toastId = null;

    const audioRef = useRef(new Audio(soundFile));
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        const audio = audioRef.current;
        if (!isPlaying) {
            audio.currentTime = 0; // Bắt đầu từ đầu
            audio.play().then(() => {
                setIsPlaying(true);
                gradualVolumeIncrease(audio, 0.4); // Tăng âm lượng dần đến 0.4
            }).catch((error) => {
                console.error("Audio playback failed:", error);
            });
        }
    };

    const gradualVolumeIncrease = (audio, targetVolume) => {
        const step = 0.02; // Mỗi bước tăng 0.02
        const interval = 100; // Mỗi 100ms tăng 1 bước
        audio.volume = 0; // Bắt đầu từ 0

        const volumeInterval = setInterval(() => {
            if (audio.volume < targetVolume) {
                audio.volume = Math.min(audio.volume + step, targetVolume); // Đảm bảo không vượt targetVolume
            } else {
                clearInterval(volumeInterval); // Dừng lại khi đạt targetVolume
            }
        }, interval);
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.loop = true; // Lặp âm thanh
        handlePlay(); // Tự động phát khi tải trang

        return () => {
            audio.pause(); // Dừng phát khi component bị unmount
            audio.currentTime = 0; // Reset thời gian phát lại
        };
    }, []);

    const location = useLocation();

    const fullPath = location.pathname.slice(1); // Remove leading "/"
    // Check if the path matches "refcode=<actual-code>"
    const refcodeMatch = fullPath.match(/^refcode=(.+)$/);
    const refcode = refcodeMatch ? refcodeMatch[1] : null;

    const randomAmount = (min = 5, max = 200) => {
        return (Math.random() * (max - min) + min).toFixed(2);
    };

    useEffect(() => {
        if (currentCoordinate.index === 0) {
            setDisable(false);
        }
    }, [currentCoordinate]);

    const handleActionComplete = (index) => {
        setActiveModal(index); // Hiển thị modal tương ứng với actionIndex
    };

    useEffect(() => {
        const interval = setInterval(() => {
            notify();
        }, 30000);

        return () => clearInterval(interval);
    }, []);

    const notify = () => {
        // const content = (
        //     <div style={{ textAlign: "center" }}>
        //         Mined {randomAmount(5, 200)}KAS at {new Date().getUTCHours()}:{new Date().getUTCMinutes()}:{new Date().getUTCSeconds()} {new Date().toLocaleDateString('us')}
        //     </div>
        // );

        // toast(content, {
        //     position: "bottom-center",
        //     hideProgressBar: true,
        //     closeOnClick: false,
        //     pauseOnHover: false,
        //     draggable: false,
        //     progress: undefined,
        //     theme: "light",
        //     closeButton: false,
        //     // className: "custom-toast",
        // });
    };

    const next = () => {
        const newIndex = (corCount + 1) % coordinates.length;
        switchModal(newIndex);
    };

    const switchModal = (newIndex) => {
        if (currentCoordinate.index === 0 && newIndex > 0) {
            setRotate(false);
        }
        if (currentCoordinate.index === 4 && newIndex === 0) {
            continueRotation();
            setRetrieve(true);
        }

        setCorCount(newIndex);
        setCurrentCoordinate(coordinates[newIndex]);
        if (activeModal) {
            setActiveModal(0);
        }
    };

    const continueRotation = () => {
        setRotate(true);
    }

    const closeModal = () => {
        setActiveModal(null);
        setDisable(false);
    };

    const [isDragging, setIsDragging] = useState(false);

    const handlePointerDown = () => {
        handlePlay();
        setIsDragging(false); // Reset trạng thái
    };

    const handlePointerMove = () => {
        setIsDragging(true); // Nếu có di chuyển, đánh dấu là đang drag
    };

    const handlePointerUp = () => {
        if (!isDragging) {
            next(); // Chỉ gọi next nếu không có thao tác drag
        }
    };

    const social = (id) => {
        let url;
        if (id === 1) {
            url = "https://www.youtube.com/@KASPOOL_OFFICIAL";
        } else if (id === 2) {
            url = "https://x.com/kaspoolofficial";
        } else if (id === 3) {
            url = "https://t.me/kaspool_official";
        }

        // Mở link trong cửa sổ mới
        window.open(url, '_blank');
    }

    return (
        <div className="landingpage">
            <header className="navbar">
                <div className="content-fit">
                    <div className="logo">
                        <a href="/">
                            <img src={logo} width={80} height={20} alt="" />
                        </a>
                    </div>
                    <nav>
                        <ul className="landingpage-nav">
                            <li className="navbar-item">
                                <a href={`/home`} className="tw-connect-wallet">Home</a>
                            </li>
                            <li>
                                <TrustWalletConnect label={"connect"} />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>

            <Canvas onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
            >
                <PerspectiveCamera makeDefault position={[defaultCamera.x, defaultCamera.y, defaultCamera.z]} fov={60} />
                <Environment files={IMAGE} background backgroundBlurriness={0.07} />
                <directionalLight
                    position={[5, -10, 5]}
                    intensity={8000}
                    color="#ffffff"
                />
                <ambientLight intensity={3} color="#ffffff" />
                <Model
                    rotation={currentCoordinate.rotation}
                    actionIndex={currentCoordinate.index}
                    onActionComplete={handleActionComplete}
                    isRetrieve={isRetrieve}
                />
                <OrbitControls autoRotate={isRotate} enableZoom={false} enablePan={false} />
            </Canvas>
            <div className="button-container">
                <FaYoutube className={`button-item`} onClick={() => social(1)} />
                <FaSquareXTwitter className={`button-item`} onClick={() => social(2)} />
                <FaTelegram className={`button-item`} onClick={() => social(3)} />
            </div>
            <ModalSection1 isOpen={activeModal === 1} isClosing={isClosing} onClose={closeModal} header={currentCoordinate.name} />
            <ModalSection2 isOpen={activeModal === 2} isClosing={isClosing} onClose={closeModal} header={currentCoordinate.name} />
            <ModalSection3 isOpen={activeModal === 3} isClosing={isClosing} onClose={closeModal} header={currentCoordinate.name} />
            <ModalSection4 isOpen={activeModal === 4} isClosing={isClosing} onClose={closeModal} header={currentCoordinate.name} />


        </div>
    );
};

export default Pyramid;
