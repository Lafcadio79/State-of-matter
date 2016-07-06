package application;

import javafx.application.Application;
import javafx.geometry.Point3D;
import javafx.scene.DepthTest;
import javafx.scene.Group;
import javafx.scene.PerspectiveCamera;
import javafx.scene.Scene;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;
import javafx.scene.paint.PhongMaterial;
import javafx.scene.shape.Box;
import javafx.scene.transform.Rotate;
import javafx.scene.transform.Transform;
import javafx.scene.transform.Translate;
import javafx.stage.Stage;


public class Main extends Application {

    final Group root = new Group();
    final XformWorld world = new XformWorld();
    final PerspectiveCamera camera = new PerspectiveCamera(true);
    final XformCamera cameraXform = new XformCamera();
    private static final double CAMERA_INITIAL_DISTANCE = -1500;
    private static final double CAMERA_NEAR_CLIP = 0.1;
    private static final double CAMERA_FAR_CLIP = 10000.0;
    double mousePosX, mousePosY, mouseOldX, mouseOldY, mouseDeltaX, mouseDeltaY;

    @Override
    public void start(Stage primaryStage) {
        root.getChildren().add(world);
        root.setDepthTest(DepthTest.ENABLE);
        buildCamera();
        buildBodySystem();
        Scene scene = new Scene(root, 1024, 768, true);
        scene.setFill(Color.LIGHTSTEELBLUE);
        handleMouse(scene);
        primaryStage.setTitle("State of Matter");
        primaryStage.setScene(scene);
        primaryStage.show();
        scene.setCamera(camera);
        scene.getStylesheets().add(getClass().getResource("application.css").toExternalForm());
    }

    private void buildCamera() {
        root.getChildren().add(cameraXform);
        cameraXform.getChildren().add(camera);
        camera.setNearClip(CAMERA_NEAR_CLIP);
        camera.setFarClip(CAMERA_FAR_CLIP);
        camera.setTranslateZ(CAMERA_INITIAL_DISTANCE);
    }

    private PhongMaterial getMaterial(Color diffuse, Color specular){
    	PhongMaterial material = new PhongMaterial();
        material.setDiffuseColor(diffuse);
        material.setSpecularColor(specular);
        return material;
    }

    private void buildBodySystem() {
        Box box = new Box(400, 400, 400);
        box.setMaterial(getMaterial(Color.DARKSLATEGREY, Color.LIGHTCORAL));
        box.setId("box");

    	Particle[] particle = new Particle[4];
        for(int i = 0; i < 4; i++){
        	if(i%2==0)
        		particle[i] = new Particle(120.0, 40*i, 35*i, 10);
        	else
        		particle[i] = new Particle(-220.0, 40*i, 35*i, 10);
        	particle[i].getSphere().setMaterial(getMaterial(Color.BLUE, Color.WHITE));
        	particle[i].getSphere().setTranslateX(particle[i].getX());
        	particle[i].getSphere().setTranslateY(particle[i].getY());
        	particle[i].getSphere().setTranslateZ(particle[i].getZ());
        	world.getChildren().add(particle[i].getSphere());
        }
        world.getChildren().addAll(box);
     }

    private void handleMouse(Scene scene) {
        scene.setOnMousePressed((MouseEvent me) -> {
            mousePosX = me.getSceneX();
            mousePosY = me.getSceneY();
            mouseOldX = me.getSceneX();
            mouseOldY = me.getSceneY();
        });
        scene.setOnMouseDragged((MouseEvent me) -> {
            mouseOldX = mousePosX;
            mouseOldY = mousePosY;
            mousePosX = me.getSceneX();
            mousePosY = me.getSceneY();
            mouseDeltaX = (mousePosX - mouseOldX);
            mouseDeltaY = (mousePosY - mouseOldY);
            if (me.isPrimaryButtonDown()) {
                cameraXform.ry(mouseDeltaX * 180.0 / scene.getWidth());
                cameraXform.rx(-mouseDeltaY * 180.0 / scene.getHeight());
            } else if (me.isSecondaryButtonDown()) {
                camera.setTranslateZ(camera.getTranslateZ() + mouseDeltaY);
            }
        });
    }

    class XformWorld extends Group {
        final Translate t = new Translate(0.0, 0.0, 0.0);
        final Rotate rx = new Rotate(0, 0, 0, 0, Rotate.X_AXIS);
        final Rotate ry = new Rotate(0, 0, 0, 0, Rotate.Y_AXIS);
        final Rotate rz = new Rotate(0, 0, 0, 0, Rotate.Z_AXIS);

        public XformWorld() {
            super();
            this.getTransforms().addAll(t, rx, ry, rz);
        }
    }

    class XformCamera extends Group {
        Point3D px = new Point3D(1.0, 0.0, 0.0);
        Point3D py = new Point3D(0.0, 1.0, 0.0);
        Rotate r;
        Transform t = new Rotate();

        public XformCamera() {
            super();
        }

        public void rx(double angle) {
            r = new Rotate(angle, px);
            this.t = t.createConcatenation(r);
            this.getTransforms().clear();
            this.getTransforms().addAll(t);
        }

        public void ry(double angle) {
            r = new Rotate(angle, py);
            this.t = t.createConcatenation(r);
            this.getTransforms().clear();
            this.getTransforms().addAll(t);
        }
    }

	public static void main(String[] args) {
		launch(args);
	}
}
