using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class MapController : MonoBehaviour
{
    private VisualElement root;
    private VisualElement _mapContainer;
    private VisualElement _mapImage;

    private bool isMapOpen => root.ClassListContains("root-container-full");

    public GameObject player { get; set; }
    [Range(1, 15)]
    public float miniMultiplyer = 5.3f;
    [Range(1, 15)]
    public float fullMultiplyer = 7f;
    private VisualElement playerRepresentation;

    void Start()
    {
        root = GetComponent<UIDocument>().rootVisualElement.Q<VisualElement>("Container");
        
        playerRepresentation = root.Q<VisualElement>("Player");

        _mapImage = root.Q<VisualElement>("Image");
        _mapContainer = root.Q<VisualElement>("Map");
    }
    void Update()
    {
        if (Input.GetKeyDown(KeyCode.M))
        {
            ToggleMap(!isMapOpen);
        }
    }
    private void ToggleMap(bool on)
    {
        root.EnableInClassList("root-container-mini", !on);
        root.EnableInClassList("root-container-full", on);
    }

    private void LateUpdate()
    {
        if (!player) return;

        var multiplyer = isMapOpen ? fullMultiplyer : miniMultiplyer;
        playerRepresentation.style.translate =new Translate(player.transform.position.x * multiplyer, player.transform.position.z * -multiplyer, 0);
        playerRepresentation.style.rotate = new Rotate(new Angle(player.transform.rotation.eulerAngles.y));

        if (!isMapOpen)
        {
            var clampWidth = _mapImage.worldBound.width / 2 -
                _mapContainer.worldBound.width / 2;
            var clampHeight = _mapImage.worldBound.height / 2 -
                _mapContainer.worldBound.height / 2;
            var xPos = Mathf.Clamp(player.transform.position.x * -multiplyer,
                -clampWidth, clampWidth);
            var yPos = Mathf.Clamp(player.transform.position.z * multiplyer,
                -clampHeight, clampHeight);
            _mapImage.style.translate = new Translate(xPos, yPos, 0);
        }
        else
        {
            _mapImage.style.translate = new Translate(0, 0, 0);
        }
    }
}
