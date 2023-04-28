using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UIElements;

public class MapController : MonoBehaviour
{
    private VisualElement root;
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

        Debug.Log("플레이어 있다!");

        var multiplyer = isMapOpen ? fullMultiplyer : miniMultiplyer;
        playerRepresentation.style.translate =new Translate(player.transform.position.x * multiplyer, player.transform.position.z * -multiplyer, 0);
        playerRepresentation.style.rotate = new Rotate(new Angle(player.transform.rotation.eulerAngles.y));
    }
}
