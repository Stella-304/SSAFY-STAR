using Fusion;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;
using Cinemachine;
using UnityEngine.UIElements;
using TMPro;

public class NPC : MonoBehaviour
{
    [Header("Move")]
    public bool isMovingNPC = true;
    public float moveSpeed = 5f;
    public float rotationSpeed = 5f;
    public Vector3 startPosition = Vector3.zero;

    private NavMeshAgent navMeshAgent;
    private Vector3 targetPosition;
    private bool isMoving = false;

    [Header("Chat")]
    [SerializeField]
    private GameObject chatUI;
    public bool doChat = false;
    public GameObject player;
    [SerializeField]
    private GameObject helperUI;
    [SerializeField]
    private TMP_Text texthelper;

    [Header("Ink Json")]
    [SerializeField]
    private TextAsset inkJSON;

    private void Start()
    {
        if (isMovingNPC) navMeshAgent = GetComponent<NavMeshAgent>();
        targetPosition = GetRandomPosition();
    }

    private void Update()
    {
        if (doChat)
        {
            GameObject.Find("UIMenu").GetComponent<UIDocument>().rootVisualElement.visible = false;
            chatUI.SetActive(true);
            DialogueManager.GetInstance().NPC = gameObject;
            DialogueManager.GetInstance().EnterDialogueMode(inkJSON);

            if (isMovingNPC)
            {
                transform.LookAt(player.transform);
                navMeshAgent.isStopped = true;
            }
            doChat = false;
            return;
        }

        if (!isMovingNPC) return;

        if (!isMoving)
        {
            navMeshAgent.SetDestination(targetPosition);
            isMoving = true;
        }
        else
        {
            if (navMeshAgent.remainingDistance <= navMeshAgent.stoppingDistance)
            {
                isMoving = false;
                targetPosition = GetRandomPosition();
            }
        }
    }

    Vector3 GetRandomPosition()
    {
        NavMeshHit hit;
        Vector3 randomPosition = transform.position + Random.insideUnitSphere * 10f;
        if (NavMesh.SamplePosition(randomPosition, out hit, 10f, NavMesh.AllAreas))
        {
            return hit.position;
        }

        return transform.position;
    }

    public void FinishChat()
    {
        chatUI.SetActive(false);
        GameObject.Find("UIMenu").GetComponent<UIDocument>().rootVisualElement.visible = true;

        if (isMovingNPC) navMeshAgent.isStopped = false;
        Camera.main.GetComponent<CameraMovement>().ResetCamera();
        if (player) player.GetComponent<CameraControl>().SetMainCameraPriorityHigh();
        StartCoroutine(ResetPlayer());

        doChat = false;
    }

    private IEnumerator ResetPlayer()
    {
        yield return new WaitForSeconds(2f);
        player.GetComponent<PlayerMovement>().stop = false;
        player.GetComponent<PlayerMovement>().isChatting = false;
    }

    private void OnTriggerEnter(Collider other)
    {
        if (other.gameObject.tag.Equals("Player"))
        {
            helperUI.SetActive(true);
            texthelper.text = "SPACE";
        }
        else if (other.gameObject.tag.Equals("NPC"))
        {
            helperUI.SetActive(true);
            texthelper.text = "æ»≥Á«œººø‰";
        }
    }

    private void OnTriggerExit(Collider other)
    {
        if (other.gameObject.tag.Equals("Player"))
        {
            helperUI.SetActive(false);
        }
    }
}
