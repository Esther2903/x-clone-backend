const SpaceParticipantService = require('./space_participantService');

class SpaceParticipantController {
    async addParticipant(req, res) {
        try {
            const { spaceId, userId } = req.body;
            const participant = await SpaceParticipantService.addParticipant(spaceId, userId);
            return res.status(201).json(participant);
        } catch (error) {
            console.error('Error adding participant:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }

    async getParticipants(req, res) {
        try {
            const { spaceId } = req.params;
            const participants = await SpaceParticipantService.getParticipants(spaceId);
            return res.status(200).json(participants);
        } catch (error) {
            console.error('Error fetching participants:', error.message);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new SpaceParticipantController();
