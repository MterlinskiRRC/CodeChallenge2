import * as eventService from '../src/api/v1/services/eventServices';

describe('Event Service', () => {
    describe('getById', () => {
        it('should return the correct event when a valid ID is provided', async () => {
            // Arrange
            // Using ID 1 from the data sample.
            const expectedId = 1;
            const expectedName = "Tech Conference 2025";

            // Act
            const result = eventService.getById(expectedId);

            // Assert
            // Verify the result matches our sample data
            expect(result).toBeDefined();
            expect(result?.id).toBe(expectedId);
            expect(result?.name).toBe(expectedName);
        });

        it('should return undefined when an event ID does not exist', async () => {
            // Arrange
            const nonExistentId = 999;

            // Act
            const result = eventService.getById(nonExistentId);

            // Assert
            // Requirements state to return null/undefined for non-existent IDs
            expect(result).toBeUndefined();
        });
    });
});